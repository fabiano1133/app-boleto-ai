"use client";

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
import { Trash2 } from "lucide-react";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { Button } from "../ui/button";

export const DeleteTicketDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="text-red-700 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja mesmo excluir o Boleto?</DialogTitle>
          <DialogDescription>
            Você irá excluir permanentemente este Boleto. Caso não queira
            prosseguir, aperte para cancelar.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <DeleteButton />
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
