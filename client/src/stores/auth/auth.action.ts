import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

export type ValidationErrors = {
  success: boolean;
  message: string;
  status: number;
  stack: object | null;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      const { data, access_token } = response.data;
      return { data, access_token };
    } catch (err) {
      const error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err
      }
      return rejectWithValue(error.response.data)
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, username }: { email: string; password: string; username: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, username });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue({ errorMessage: error.message });
      }
      return rejectWithValue({ errorMessage: 'Register failed' });
    }
  }
);