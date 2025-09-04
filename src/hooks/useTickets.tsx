"use client";

import { useState, useEffect } from "react";
import { getTicketsByStatus } from "@/api/ticketService";
import { PaymentStatusEnum } from "@/components/TicketList/Type/Ticket";
import { Ticket } from "@/@types";

export const useTickets = () => {
  const [ticketsPaid, setTicketsPaid] = useState<Ticket[]>([]);
  const [ticketsExpired, setTicketsExpired] = useState<Ticket[]>([]);
  const [ticketsPendent, setTicketsPendent] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const statusUse = [
          PaymentStatusEnum.PAID,
          PaymentStatusEnum.EXPIRED,
          PaymentStatusEnum.PENDENT,
        ];

        const [paid, expired, pendent] = await Promise.all(
          statusUse.map((status) => getTicketsByStatus(status))
        );

        setTicketsPaid(paid);
        setTicketsExpired(expired);
        setTicketsPendent(pendent);
        setLastUpdated(new Date());
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar boletos");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return {
    ticketsPaid,
    ticketsExpired,
    ticketsPendent,
    loading,
    error,
    lastUpdated,
  };
};
