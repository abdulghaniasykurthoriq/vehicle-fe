import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

function resolveBaseURL(): string {
  return `https://103-186-1-205.nip.io/`;
}

export const api = axios.create({
  baseURL: resolveBaseURL(),
  withCredentials: true, // kalau pakai cookie
  timeout: 15000,
});

let accessTokenGetter: () => string | null = () => null;
let refreshHandler: () => Promise<boolean> = async () => false;

export function bindAccessTokenGetter(fn: () => string | null) {
  accessTokenGetter = fn;
}
export function bindRefreshHandler(fn: () => Promise<boolean>) {
  refreshHandler = fn;
}

api.interceptors.request.use((config) => {
  const token = accessTokenGetter();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshingPromise: Promise<boolean> | null = null;
const AUTH_PATHS = ["/auth/login", "/auth/refresh", "/auth/logout"];

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const cfg = err.config as AxiosRequestConfig | undefined;
    if (!cfg || err.response?.status !== 401) throw err;

    const url =
      (cfg.baseURL ? new URL(cfg.url!, cfg.baseURL).pathname : cfg.url) || "";
    if (AUTH_PATHS.some((p) => url.startsWith(p))) throw err;

    if (cfg._retry) throw err;
    cfg._retry = true;

    if (!refreshingPromise) {
      refreshingPromise = refreshHandler().finally(() => {
        refreshingPromise = null;
      });
    }
    const ok = await refreshingPromise;
    if (!ok) throw err;

    const newToken = accessTokenGetter();
    if (newToken) {
      cfg.headers = cfg.headers ?? {};
      (cfg.headers as any).Authorization = `Bearer ${newToken}`;
    }
    return api(cfg);
  }
);
