"use client";

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTicket } from "@/api/ticketService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Ticket } from "@/@types";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EditTicketFormData,
  editTicketYupSchema,
} from "@/components/CreateTicketDialog/schema";
import { yupResolver } from "@hookform/resolvers/yup";

type EditTicketDialogProps = {
  ticket: Ticket;
  onUpdate: () => void;
  disabled: boolean;
};

export default function EditTicketDialog({
  ticket,
  onUpdate,
  disabled,
}: EditTicketDialogProps) {
  const [status, setStatus] = useState(ticket.status);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueMasked, setValueMasked] = useState("0,00");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EditTicketFormData>({
    resolver: yupResolver(editTicketYupSchema),
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

  const onSubmit: SubmitHandler<EditTicketFormData> = async (
    data: EditTicketFormData
  ) => {
    setLoading(true);

    try {
      await updateTicket(ticket.id, data);
      setOpen(false);
      onUpdate();
      toast.success("Seu Boleto foi Atualizado com sucesso!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao tentar atualizar o boleto!", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && ticket) {
      reset({
        title: ticket.title,
        expirationDate: ticket.expirationDate
          ? new Date(ticket.expirationDate).toISOString().split("T")[0]
          : "",
        value: ticket.value,
        status: ticket.status,
      });

      setValueMasked(
        ticket.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      );
      setStatus(ticket.status);
    }
  }, [open, ticket, reset]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="cursor-pointer"
          variant="default"
        >
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Você está editando o seu Boleto</DialogTitle>
            <DialogDescription>
              Faça alterações do seu Boleto aqui. Clique em salvar quando você
              finalizar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Título</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="expiredDate">Data de Vencimento</Label>
              <Input
                id="expiredDate"
                type="date"
                {...register("expirationDate")}
              />
              {errors.expirationDate && (
                <p className="text-xs text-red-500">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="value">Valor do Boleto</Label>
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
            <div className="grid gap-3">
              <Label htmlFor="value">Status</Label>
              <Input id="status" disabled={true} {...register("status")} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando" : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
