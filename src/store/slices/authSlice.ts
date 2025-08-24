// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../lib/api";

type User = { id: string; email: string; role: string; name?: string | null };

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuth: false,
  loading: false,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", payload);
    return data as { user: User; accessToken: string };
  }
);

export const refreshThunk = createAsyncThunk("auth/refresh", async () => {
  const { data } = await api.post("/auth/refresh");
  return data as { accessToken: string };
});

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (s) => {
      s.user = null;
      s.accessToken = null;
      s.isAuth = false;
    },
    setUser: (s, a) => {
      s.user = a.payload;
      s.isAuth = !!a.payload;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => {
      s.loading = true;
    })
      .addCase(loginThunk.rejected, (s) => {
        s.loading = false;
      })
      .addCase(loginThunk.fulfilled, (s, { payload }) => {
        s.user = payload.user;
        s.accessToken = payload.accessToken;
        s.isAuth = true;
        s.loading = false;
      })
      .addCase(refreshThunk.fulfilled, (s, { payload }) => {
        s.accessToken = payload.accessToken;
        s.isAuth = true;
      })
      .addCase(logoutThunk.fulfilled, (s) => {
        s.user = null;
        s.accessToken = null;
        s.isAuth = false;
      });
  },
});

export const { clearAuth, setUser } = slice.actions;
export default slice.reducer;
