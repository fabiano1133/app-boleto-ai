"use client";

import { Ticket } from "@/@types";
import { getTicketsByStatus } from "@/api/ticketService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { PaymentStatusEnum } from "../TicketList/Type/Ticket";
import { TicketDetails } from "../TicketDetails/TicektDetails";

export const PendentsTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicketsByStatus(PaymentStatusEnum.PENDENT);
        setTickets(response as Ticket[]);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os boletos", error);
        setError("Ocorreu um erro ao buscar os boletos");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Exibir Boletos</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Boletos</DialogTitle>

          <DialogDescription>Boletos aguardando pagamento</DialogDescription>
        </DialogHeader>
        {loading && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              Carregando...
            </span>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && (
          <ScrollArea className="h-64 pr-2">
            <ul className="space-y-4 text-sm">
              {tickets.length === 0 ? (
                <li className="text-muted-foreground">
                  Nenhum boleto encontrado.
                </li>
              ) : (
                tickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="border rounded-md p-3 bg-muted/50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{ticket.beneficiarysName}</p>
                        <p className="text-xs text-muted-foreground">
                          Valor:{" "}
                          {new Intl.NumberFormat("pt-Br", {
                            style: "currency",
                            currency: "BRL",
                          }).format(Number(ticket.value))}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(ticket.expirationDate)
                            .toISOString()
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("/")}
                        </p>
                      </div>
                      <div>
                        <TicketDetails ticket={ticket} />
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};
