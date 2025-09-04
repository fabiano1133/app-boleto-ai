"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentStatusEnum } from "../TicketList/Type/Ticket";
import { LinkPagination } from "../LinkPagination/LinkPagination";
import EditTicketDialog from "../EditTicketDialog/EditTicketDialog";
import { CreateTicketDialog } from "../CreateTicketDialog/CreateTicketDialog";
import { useEffect, useState } from "react";
import { DeleteTicketDialog } from "../DeleteTicketDialog/DeleteTicketDialog";
import { getTickets, Metadata } from "@/api/ticketService";
import { useSearchParams } from "next/navigation";
import { Ticket } from "@/@types";
import Header from "@/components/layout/Header/Header";
import { Footer } from "../layout/Footer/Footer";
import { JwtPayload } from "@/api/auth/ultils";
import { TicketContainer } from "../TicketContainer/TicketContainer";
import { PageWrapper } from "@/app/page-wrapper";
import Loader from "../Loader/Loader";

interface TitcketTableProps {
  user: JwtPayload | null;
}

export default function TicketTable({ user }: TitcketTableProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [pagination, setPagination] = useState<Metadata>({
    page: currentPage,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(error);
  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await getTickets(currentPage);
      setTickets(response.data as unknown as Ticket[]);
      setPagination(response.metadata);
    } catch (err) {
      console.error("Ocorreu um erro ao buscar os boletos", err);
      setError("Ocorreu um erro ao buscar os boletos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  return (
    <>
      <Header user={user} />
      <TicketContainer>
        <div className=" flex justify-start mb-3">
          <CreateTicketDialog />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <PageWrapper>
            {!tickets.length ? (
              <div className="flex justify-center items-center h-[250px]">
                <span>
                  Não há boletos para exibir. Cadastre um novo boleto!
                </span>
              </div>
            ) : (
              <Table>
                <TableCaption>
                  <LinkPagination
                    page={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                  />
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Beneficiário</TableHead>
                    <TableHead>Data de Vencimento</TableHead>
                    <TableHead className="text-start">Valor</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Ação</TableHead>
                    <TableHead className="text-center">Excluir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.beneficiarysName}</TableCell>
                      <TableCell>
                        {new Date(ticket.expirationDate)
                          .toISOString()
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("/")}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(ticket.value)}
                      </TableCell>
                      <TableCell>
                        <div
                          className={`text-white text-base font-medium text-center rounded-2xl p-1 ${
                            ticket.status === PaymentStatusEnum.PENDENT
                              ? "bg-amber-400"
                              : ticket.status === PaymentStatusEnum.EXPIRED
                              ? "bg-red-600"
                              : "bg-green-600"
                          }`}
                        >
                          {ticket.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <EditTicketDialog
                          disabled={ticket.status === "Pago" ? true : false}
                          ticket={ticket}
                          onUpdate={fetchTickets}
                        />
                      </TableCell>
                      <TableCell className="flex justify-center">
                        <DeleteTicketDialog />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={7}>Valor Total</TableCell>
                    <TableCell className="text-center" colSpan={2}>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        tickets.reduce((total, t) => total + t.value, 0)
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            )}
            <Footer />
          </PageWrapper>
        )}
      </TicketContainer>
    </>
  );
}
