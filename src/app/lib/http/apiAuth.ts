import { getAuthToken } from "@/api/auth/ultils";
import { api } from "./axios";

export const apiAuth = async () => {
  const authApi = api;

  const headers = await getAuthToken();

  authApi.interceptors.request.use((config) => {
    config.headers.Authorization = headers.Authorization;
    return config;
  });
  return authApi;
};
