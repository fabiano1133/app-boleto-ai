import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Ticket } from "@/@types";
import { TicketBarcode } from "../TicketBarcode/TicketBarcode";
import { PaymentStatusEnum } from "../TicketList/Type/Ticket";
import { SetTicketPaidButton } from "../SetTicketPaidButton/SetTicketPaidButton";
import { useState } from "react";

interface TicektDetailsProps {
  ticket: Ticket;
}

export const TicketDetails = ({ ticket }: TicektDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Detalhes</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">
            Detalhes do Boleto
          </DialogTitle>
          <DialogDescription asChild>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">ID</p>
                <p className="break-words">{ticket.id}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Título</p>
                <p>{ticket.title}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Beneficiário</p>
                <p>{ticket.beneficiarysName}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Valor do boleto</p>
                <p className="text-green-700 font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(ticket.value))}
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Vencimento</p>
                <p className="font-semibold text-foreground">
                  {new Date(ticket.expirationDate)
                    .toISOString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Status</p>
                <p
                  className={`font-semibold text-foreground inline-block rounded-full px-3 py-1 text-xs  ${
                    ticket.status === PaymentStatusEnum.EXPIRED
                      ? "bg-red-300"
                      : "bg-amber-200"
                  }`}
                >
                  {ticket.status}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="font-semibold text-foreground">Descrição</p>
                <p>{ticket.description}</p>
              </div>

              <div>
                <p className="font-semibold text-foreground">Categoria</p>
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                  {ticket.category}
                </span>
              </div>

              <div>
                <p className="font-semibold text-foreground">Emissão</p>
                <p className="font-semibold text-foreground">
                  {new Date(ticket.issueAt)
                    .toISOString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")}
                </p>
              </div>

              <div className="sm:col-span-2">
                <div className="border-t border-muted"></div>
                <div className="flex flex-col items-center justify-center space-y-2">
                  {ticket.digitableLine && (
                    <div className="w-full flex justify-center">
                      <TicketBarcode digitableLine={ticket.digitableLine} />
                    </div>
                  )}
                  <p className="font-semibold text-center text-foreground break-all">
                    {ticket.digitableLine}
                  </p>
                </div>
                <div className="border-t border-muted"></div>
              </div>

              <div className="flex justify-between items-center col-span-full w-full">
                <div className="sm:col-span-2">
                  <p className="font-semibold text-foreground">Observações</p>
                  <p>{ticket.notes}</p>
                </div>

                <SetTicketPaidButton
                  ticket={ticket}
                  onSuccess={() => setIsOpen(false)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
