import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROLE } from "../../types/roles";
import { login, logout, register } from "./auth.action";

interface User {
  _id: string;
  email: string;
  username: string;
  role: ROLE
}

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
      // state.isAuthenticated = true;
    },
    resetStatus: (state) => {
      state.status = "idle";
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
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  }
})

export const { setCredentials, resetStatus } = authSlice.actions;

export default authSlice.reducer;