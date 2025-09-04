"use client";

import { LoginPageButton } from "@/components/LoginPageButton/LoginPageButton";
import Image from "next/image";
import { PageWrapper } from "./page-wrapper";
import {
  SlidersVertical,
  CircleMinus,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { AlreadyAccountButton } from "@/components/AlreadyAccountButton/already-account-button";

export default function Home() {
  const iconsMap: Record<string, React.ElementType> = {
    card1: SlidersVertical,
    card2: CircleMinus,
    card3: ShieldCheck,
    card4: Handshake,
  };

  const cardProperties = [
    {
      id: "CARD1",
      title: "Controle centralizado",
      description: `Visualize todos os seus boletos em um só painel e facilite a tomada de decisões com informações integradas e atualizadas e tempo real.`,
      icon: "card1",
    },

    {
      id: "CARD2",
      title: "Redução de Inadimplência",
      description:
        "Automatize alertas e notificações de vencimento para manter o fluxo financeiro saudável, reduzindo atrasos e esquecimentos.",
      icon: "card2",
    },

    {
      id: "CARD3",
      title: "Segurança e Confiabilidade",
      description:
        "Garanta proteção de dados e rastreabilidade das operações, minimizando riscos em cada estapa da cobrança entre empresas.",
      icon: "card3",
    },

    {
      id: "CARD4",
      title: "Economia Operacional",
      description:
        "Elimine retrabalho, papéis e processos manuais, otimizando tempo e recursos para sua equipe financeira focar no crescimento do negócio.",
      icon: "card4",
    },
  ];

  return (
    <div className=" flex flex-col min-h-screen bg-white">
      <header className="bg-sky-950 h-12 flex justify-between p-4 md:p-6 items-center fixed top-0 left-0 w-full shadow-md z-50">
        <div>
          <Image
            alt="logo-header-boleto-ai"
            src={"/boleto-ai-logo.svg"}
            width={100}
            height={100}
          />
        </div>
      </header>
      <PageWrapper>
        <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-6 p-8 md:p-0">
          {/* {Bloco de Imagem} */}
          <div className="flex justify-center">
            <Image
              className="w-full max-w-xs md:max-w-md rounded-4xl"
              alt="hero"
              src={"/hero-image.png"}
              width={380}
              height={200}
            />
          </div>

          {/* {Bloco de Texto} */}
          <div className="">
            <div className="flex flex-col items-start text-left space-y-6">
              <h1 className="text-2xl md:text-5xl font-bold text-indigo-900 drop-shadow-2xl">
                Simplifique a gestão de boletos
              </h1>
              <p className="text-slate-800 text-base md:text-xl text-wrap">
                Centralize todos os seus boletos e otimize o fluxo financeiro
                <br /> do seu negócio com tecnologia inteligente.
              </p>
              <div className="flex gap-3">
                <LoginPageButton />
                <AlreadyAccountButton />
              </div>
            </div>
          </div>
        </main>
        <div className="flex flex-col justify-center items-center gap-3 md:flex md:flex-row md:gap-3 mb-8 md:mb-0">
          {cardProperties.flatMap((card) => {
            const Icon = iconsMap[card.icon];
            return (
              <div
                key={card.id}
                className="min-w-[250px] max-w-[430px] h-[158px] p-6 rounded-2xl shadow-sm md:shadow-md md:flex-1 md:min-w-[250px] md:max-w-[300px] md:h-[200px]"
              >
                <div className="flex flex-row gap-2">
                  {Icon && <Icon className="text-sky-950" />}
                  <h3 className="font-semibold text-sky-900">{card.title}</h3>
                </div>
                <div>
                  <p className="text-md text-sky-950 mt-2 text-justify">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </PageWrapper>
    </div>
  );
}
