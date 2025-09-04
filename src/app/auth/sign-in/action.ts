"use server";

import { api } from "@/app/lib/http/axios";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(email: string, password: string) {
  try {
    const response = await api.post("/api/v1/auth/sign-in", {
      email,
      password,
    });

    const { access_token } = response.data;

    if (!access_token) {
      return { error: "Ocorreu um erro ao tentar obter o token" };
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "auth-token",
      value: access_token,
      httpOnly: true,
      path: "/",
      maxAge: 3600,
    });

    return { success: true };
  } catch (error: unknown) {
    let message: string;

    if (error instanceof AxiosError) {
      if (error.code === "ECONNREFUSED") {
        message = "Serviço temporariamente indisponível";
        return { error: message };
      }

      message = error.response?.data.error;
      return { error: message };
    }

    message = "Erro inesperado. Tente novamente mais tarde.";
    return { error: message };
  }
}

export async function signout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  redirect("/auth/sign-in");
}
