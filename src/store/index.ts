import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { bindAccessTokenGetter, bindRefreshHandler } from "../lib/api";
import { refreshThunk } from "./slices/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

bindAccessTokenGetter(() => store.getState().auth.accessToken);
bindRefreshHandler(async () => {
  try {
    await store.dispatch(refreshThunk()).unwrap();
    return true;
  } catch {
    return false;
  }
});
