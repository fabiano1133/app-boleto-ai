"use client";

import { PageWrapper } from "@/app/page-wrapper";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { LoginFormData, loginSchema } from "./schema";
import SigninButton from "./signin-button";
import { signin } from "@/app/auth/sign-in/action";
import Link from "next/link";

export default function Signin() {
  const [isPending, startTransiction] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  console.log(error);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    data: LoginFormData
  ) => {
    startTransiction(async () => {
      try {
        const { email, password } = data;

        const result = await signin(email, password);

        if (result?.error) {
          toast.error(result.error, {
            position: "top-right",
          });
        } else {
          toast.success("Usuário logado com Sucesso!", {
            position: "top-right",
          });
          router.push("/dashboard");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("Erro inesperado ao tentar realizar o login");
        toast.warning(err?.response.data.error, {
          position: "top-right",
        });
      }
    });
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-[320px] shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardHeader className="pb-0">
              <div className="flex justify-center mb-4">
                <Image
                  src="/boleto-ai-logo.svg"
                  alt="Logo"
                  width={220}
                  height={55}
                />
              </div>
              <CardTitle className="text-center text-sm font-semibold text-sky-950">
                Que bom te ver por aqui! 😊❤️
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div className=" space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Input
                  id="password"
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Link className="text-sm font-sans" href={"/forgot-password"}>
                  Esqueci minha senha
                </Link>
              </div>
            </CardContent>

            <CardFooter className="pt-4 flex-col">
              <SigninButton disabled={isPending}>
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>Acessar</span>
                )}
              </SigninButton>

              <div className="flex items-center justify-center gap-1 mt-3">
                <span>Não tem uma conta?</span>
                <button
                  type="button"
                  className="text-sm text-sky-950 font-semibold cursor-pointer underline transition"
                  onClick={() => router.push("/signup")}
                >
                  Registrar
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageWrapper>
  );
}
