"use client";

import { Ticket } from "@/@types";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { updateTicketToPaid } from "@/api/ticketService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SetTicektPaidProps {
  ticket: Ticket;
  onSuccess: () => void;
}

export const SetTicketPaidButton = ({
  ticket,
  onSuccess,
}: SetTicektPaidProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSetTicketAsPaid = async () => {
    setIsLoading(true);
    try {
      await updateTicketToPaid(ticket.id);
      toast.success("Pagamento Confirmado", {
        position: "top-center",
      });
      router.push("/tickets");
      // window.location.href = "/";
    } catch (error: any) {
      console.log("Erro ao tentar atualizar pagamento", error);
      toast.error(error, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button
        variant={"create"}
        className="cursor-pointer"
        disabled={isLoading}
        onClick={handleSetTicketAsPaid}
      >
        {isLoading ? "Processando" : "Já Paguei"}
      </Button>
    </div>
  );
};
