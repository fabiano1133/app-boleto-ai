"use client";

import React, { useState } from "react";
import { api } from "@/app/lib/http/axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreateTicketFormData,
  createTicketSchema,
} from "@/components/CreateTicketDialog/schema";
import CustomSelect from "../Select/Select";
import { AxiosError } from "axios";

export const CreateTicketDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valueMasked, setValueMasked] = useState("R$ 0,00");
  const [category, setCategory] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTicketFormData>({
    resolver: yupResolver(createTicketSchema),
  });

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const numeric = Number(raw) / 100;

    setValue("value", numeric, { shouldValidate: true });
    setValueMasked(
      numeric.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    );
  };

  const handleCategoryChange = (value: string) => {
    setValue("category", value, { shouldValidate: true });
    setCategory(value);
  };

  const onSubmit: SubmitHandler<CreateTicketFormData> = async (
    data: CreateTicketFormData
  ) => {
    setIsLoading(true);

    try {
      const response = await api.post("/api/v1/tickets", data);

      if (response.data?.error) {
        throw new Error(response.data.error);
      }

      toast.success("Boleto Cadastrado Com Sucesso!", {
        position: "top-center",
      });
      router.push("/tickets");

      reset();
      setValueMasked("R$ 0,00");
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data.error ||
          "Erro ao criar boleto. Tente novamente.";
        toast.error(message, {
          position: "top-center",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer transition shadow-sm"
          variant="create"
        >
          <CirclePlus className="mr-2 h-4 w-4" />
          Novo Boleto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-lg">Novo Boleto</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para cadastrar um novo boleto.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="ex: Seguro Residencial"
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="beneficiary">Beneficiário *</Label>
              <Input
                id="beneficiary"
                {...register("beneficiarysName")}
                placeholder="ex: João da Silva"
              />
              {errors.beneficiarysName && (
                <p className="text-xs text-red-500">
                  {errors.beneficiarysName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expirationDate">Data de vencimento *</Label>
              <Input
                id="expirationDate"
                type="date"
                {...register("expirationDate", { valueAsDate: true })}
              />
              {errors.expirationDate && (
                <p className="text-xs text-red-500">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Valor do Boleto *</Label>
              <Input
                id="value"
                placeholder="R$"
                value={valueMasked}
                onChange={handleValueChange}
              />
              {errors.value && (
                <p className="text-xs text-red-500">{errors.value.message}</p>
              )}
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                {...register("description")}
                placeholder="ex: Mensalidade do seguro residencial"
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoria *</Label>
              <CustomSelect
                value={category}
                onValueChange={handleCategoryChange}
              />
              {/* <Input
                id="category"
                {...register("category")}
                placeholder="ex: Contas Fixas"
              /> */}
              {errors.category && (
                <p className="text-xs text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="digitableLine">Linha Digitável *</Label>
              <Input
                id="digitableLine"
                {...register("digitableLine")}
                placeholder="ex: 00190.00009 02108.034520..."
              />
              {errors.digitableLine && (
                <p className="text-xs text-red-500">
                  {errors.digitableLine.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="issueAt">Data de Emissão do Boleto *</Label>
              <Input
                id="issueAt"
                type="date"
                {...register("issueAt", { valueAsDate: true })}
              />
              {errors.issueAt && (
                <p className="text-xs text-red-500">{errors.issueAt.message}</p>
              )}
            </div>

            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="notes">Observações *</Label>
              <Input id="notes" {...register("notes")} />
              {errors.notes && (
                <p className="text-xs text-red-500">{errors.notes.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
