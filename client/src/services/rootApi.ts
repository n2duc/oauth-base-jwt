import { setCredentials } from "@/stores/auth/auth.slice";
import { RootState } from "@/stores/store";
import { Mutex } from "async-mutex";
// Using async-mutex to prevent multiple calls to '/refresh' when multiple calls fail with 401 Unauthorized errors.
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL || "";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

interface RefreshResponse {
  access_token: string;
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 410) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/auth/refresh",
          api,
          extraOptions
        );
        if (refreshResult?.data) {
          const state = api.getState() as RootState;
          const user = state.auth?.userInfo;
          // store new token
          const { access_token } = refreshResult.data as RefreshResponse;
          if (user) {
            api.dispatch(setCredentials({ data: user, access_token }));
          }
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: baseQueryWithReauth,
  // endpoints: builder => ({}), // Add this here if you don't have any endpoints yet
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = rootApi;
