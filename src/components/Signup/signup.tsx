"use client";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Loader2,
  User,
  Mail,
  Fingerprint,
  MapPin,
  Lock,
  PhoneCall,
  Milestone,
  Signpost,
  Compass,
  TrendingUp,
} from "lucide-react";
import { AlreadyAccountButton } from "@/components/AlreadyAccountButton/already-account-button";
import { signup } from "@/api/tenantService";
import { Tenant } from "@/@types";

import SigninButton from "@/components/Signin/signin-button";

import { SignupFormData, signupSchema } from "./schema";
import { PageWrapper } from "@/app/page-wrapper";
import {
  normalizeCepNumber,
  normalizeCpfCnpj,
  normalizeMobilePhone,
} from "./mask";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [cpfCnpjMasked, setCpfCnpjMasked] = useState("");
  const [mobilePhoneMasked, setMobilePhoneMasked] = useState("");
  const [cepMasked, setCepMasked] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const toString = String(raw);

    setValue("cpfCnpj", toString, { shouldValidate: true });
    setCpfCnpjMasked(normalizeCpfCnpj(toString));
  };

  const handleMobilePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const toString = String(raw);

    setValue("mobilePhone", toString, { shouldValidate: true });
    setMobilePhoneMasked(normalizeMobilePhone(toString));
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const toString = String(raw);

    setValue("postalCode", toString, { shouldValidate: true });
    setCepMasked(normalizeCepNumber(toString));
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setIsLoading(true);

    try {
      const response = await signup(data as Tenant);

      if (response.data?.error) {
        toast.error(response.data?.error, {
          position: "top-right",
        });
        throw new Error(
          response.data.error || "Erro ao tentar criar uma nova conta"
        );
      }

      toast.success("Conta criada com sucesso!", {
        position: "top-center",
      });
      router.push("/auth/sign-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.warning(err?.response.data.error, {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <Card className="w-full max-w-3xl shadow-xl rounded-2xl border border-slate-200 bg-white p-6">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardHeader className="pb-0">
              <CardTitle className="text-center text-muted-foreground font-semibold">
                Crie sua conta
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className=" space-y-1">
                <User className=" text-gray-500 h-4 w-4" />
                <Input
                  id="name"
                  type="name"
                  placeholder="Nome"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <Mail className=" text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <Fingerprint className=" text-gray-500 h-4 w-4" />
                <Input
                  id="cpfCnpj"
                  placeholder="CPF ou CNPJ"
                  value={cpfCnpjMasked}
                  onChange={handleCpfCnpjChange}
                />
                {errors.cpfCnpj && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.cpfCnpj.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <PhoneCall className=" text-gray-500 h-4 w-4" />
                <Input
                  id="mobilePhone"
                  placeholder="Whatsapp"
                  value={mobilePhoneMasked}
                  onChange={handleMobilePhoneChange}
                />
                {errors.mobilePhone && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.mobilePhone.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <MapPin className=" text-gray-500 h-4 w-4" />
                <Input
                  id="address"
                  type="text"
                  placeholder="Endereço"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <Milestone className=" text-gray-500 h-4 w-4" />
                <Input
                  id="addressNumber"
                  type="text"
                  placeholder="Nº"
                  {...register("addressNumber")}
                />
                {errors.addressNumber && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.addressNumber.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <Signpost className=" text-gray-500 h-4 w-4" />
                <Input
                  id="complement"
                  type="text"
                  placeholder="Complemento"
                  {...register("complement")}
                />
                {errors.complement && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.complement.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <Compass className=" text-gray-500 h-4 w-4" />
                <Input
                  id="province"
                  type="text"
                  placeholder="Bairro"
                  {...register("province")}
                />
                {errors.province && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <TrendingUp className=" text-gray-500 h-4 w-4" />
                <Input
                  id="postalCode"
                  placeholder="CEP"
                  value={cepMasked}
                  onChange={handleCepChange}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <TrendingUp className=" text-gray-500 h-4 w-4" />
                <Input
                  id="city"
                  type="text"
                  placeholder="Cidade"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className=" space-y-1">
                <TrendingUp className=" text-gray-500 h-4 w-4" />
                <Input
                  id="state"
                  type="text"
                  placeholder="Estado"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.state.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Lock className=" text-gray-500 h-4 w-4" />
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 animate-in fade-in duration-200">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-4 flex justify-end gap-3">
              <AlreadyAccountButton />
              <SigninButton disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Criando
                    conta...
                  </span>
                ) : (
                  "Criar Conta"
                )}
              </SigninButton>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PageWrapper>
  );
}
