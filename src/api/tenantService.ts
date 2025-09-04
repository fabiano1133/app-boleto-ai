import { Tenant } from "@/@types";
import { api } from "@/app/lib/http/axios";

export const signup = async (body: Tenant) => {
  const response = await api.post("api/v1/tenants", body);
  return response.data;
};
