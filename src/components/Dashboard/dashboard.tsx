"use client";

import React, { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import { Footer } from "@/components/layout/Footer/Footer";
import { TicketCard } from "@/components/TicketCard/TicketCard";
import { CreateTicketDialog } from "@/components/CreateTicketDialog/CreateTicketDialog";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { PendentsTickets } from "@/components/PendentsTickets/PendentsTickets";
import { ExpiredTickets } from "@/components/ExpiredTickets/ExpiredTickets";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTickets } from "@/hooks/useTickets";
import { PageWrapper } from "@/app/page-wrapper";
import { JwtPayload } from "@/api/auth/ultils";
import Loader from "../Loader/Loader";

interface DashboardProps {
  user: JwtPayload | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const router = useRouter();
  const { ticketsPaid, ticketsExpired, ticketsPendent, loading, lastUpdated } =
    useTickets();
  const [now, setNow] = useState(new Date());
  console.log(now);
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(interval);
  }, [router]);

  const formattedUpdateTime = lastUpdated
    ? `Atualizado ${formatDistanceToNow(lastUpdated, {
        addSuffix: true,
        locale: ptBR,
      })}`
    : "Carregando...";

  return (
    <>
      <Header user={user} />
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <PageWrapper>
            <main className="flex flex-col gap-8 px-6 py-8 max-w-7xl mx-auto">
              <header className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Olá, {user?.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Aqui está o resumo da sua operação hoje.
                  </p>
                </div>
                <CreateTicketDialog />
              </header>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TicketCard
                  title="Boletos Pagos"
                  description="Confirmados este mês"
                  count={ticketsPaid.length}
                  footerText={formattedUpdateTime}
                  icon={<CheckCircle className="text-green-600 h-6 w-6" />}
                />
                <TicketCard
                  title="Pendentes"
                  description="Aguardando pagamento"
                  count={ticketsPendent.length}
                  footerText="Total atual"
                  icon={<Clock className="text-yellow-600 h-6 w-6" />}
                  onActionClick
                  component={<PendentsTickets />}
                />
                <TicketCard
                  title="Vencidos"
                  description="Necessita atenção"
                  count={ticketsExpired.length}
                  footerText="Acesse a área de Boletos"
                  icon={<AlertCircle className="text-red-600 h-6 w-6" />}
                  onActionClick
                  component={<ExpiredTickets />}
                />
              </section>
            </main>
          </PageWrapper>
        )}
      </Container>
      <Footer />
    </>
  );
}
