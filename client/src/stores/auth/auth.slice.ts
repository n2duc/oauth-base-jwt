import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleAuth, login, logout, register } from "./auth.action";
import { User } from "@/type/data-models";

interface AuthError {
  success: boolean;
  message: string;
  status: number;
  stack: object | null;
}

interface AuthState {
  userInfo: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: AuthError | null;
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
};

const initialState: AuthState = {
  userInfo: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  status: 'idle',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ data: User; access_token: string }>) => {
      state.userInfo = action.payload.data;
      state.accessToken = action.payload.access_token;
      state.isAuthenticated = true;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.avatar = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ data: User; access_token: string }>) => {
        state.userInfo = action.payload.data;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.status = "resolved";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
        state.status = "rejected";
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending"
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(googleAuth.fulfilled, (state, action: PayloadAction<{ data: User; access_token: string }>) => {
        state.userInfo = action.payload.data;
        state.accessToken = action.payload.access_token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as AuthError;
        state.status = "rejected";
      })
  }
})

export const { setCredentials, resetStatus, setAvatar } = authSlice.actions;

export default authSlice.reducer;