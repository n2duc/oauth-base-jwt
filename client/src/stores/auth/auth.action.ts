import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

const axiosPublic = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export type ValidationErrors = {
  success: boolean;
  message: string;
  status: number;
  stack: object | null;
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPublic.post("/auth/login", {
        username,
        password,
      });
      const { data, access_token } = response.data;
      return { data, access_token };
    } catch (err) {
      const error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      username,
    }: { email: string; password: string; username: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPublic.post("/auth/register", {
        email,
        password,
        username,
      });
      return response.data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

interface IGoogleAuthBody {
  name: string;
  email: string;
  photoUrl: string;
}

export const googleAuth = createAsyncThunk(
  "auth/google",
  async (
    { name, email, photoUrl }: IGoogleAuthBody,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosPublic.post("/auth/google", { name, email, photoUrl });
      return response.data;
    } catch (err) {
      const error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosPublic.post("/auth/logout");
      return;
    } catch (err) {
      const error: AxiosError<ValidationErrors> =
        err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
