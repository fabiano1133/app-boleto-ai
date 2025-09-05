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
import Link from "next/link";

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
      <header className="bg-amber-50 h-20 flex justify-between p-4 md:p-6 items-center fixed top-0 left-0 w-full shadow-md z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href="/" aria-label="Página inicial">
            <Image
              alt="Logo Boleto AI"
              src="/boleto-ai-logo.svg"
              width={120}
              height={40}
              priority
            />
          </Link>
          <div className="hidden md:flex gap-3">
            <LoginPageButton />
            <AlreadyAccountButton />
          </div>
        </nav>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-6"></div>
      </header>
      <PageWrapper>
        <main className="flex-1 flex flex-col items-center justify-center mt-25 md:mt-20">
          {/* {Hero Section} */}

          <section
            aria-labelledby="hero-title"
            className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-12 lg:px-20 w-full max-w-7xl"
          >
            {/* Texto */}
            <div className="flex-1 space-y-6 text-left">
              <h1
                id="hero-title"
                className="text-3xl md:text-5xl font-bold text-indigo-900 drop-shadow"
              >
                Simplifique a gestão de boletos
              </h1>
              <p className="text-slate-800 text-base md:text-lg leading-relaxed">
                Centralize todos os seus boletos e otimize o fluxo financeiro do
                seu negócio com tecnologia inteligente.
              </p>
              <div className="flex gap-4">
                <LoginPageButton />
                <AlreadyAccountButton />
              </div>
            </div>

            <div className="flex-1 hidden md:flex justify-center">
              <Image
                src="/section-hero-image-home.png"
                alt="Ilustração de gestão de boletos"
                width={500}
                height={300}
                className="object-contain rounded-b-4xl"
              />
            </div>
          </section>

          {/* Features Section */}
          <section
            aria-labelledby="features-title"
            className="w-full max-w-7xl px-6 md:px-12 lg:px-20 py-12"
          >
            <h2 id="features-title" className="sr-only">
              Benefícios do sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cardProperties.map((card) => {
                const Icon = iconsMap[card.icon];
                return (
                  <article
                    key={card.id}
                    className="p-6 rounded-2xl shadow-sm md:shadow-md bg-white hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {Icon && <Icon className="text-sky-950 w-6 h-6" />}
                      <h3 className="font-semibold text-sky-900">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </PageWrapper>
      {/* Footer */}
      <footer className="bg-sky-950 text-white py-4 text-center text-sm">
        © {new Date().getFullYear()} Boleto AI. Todos os direitos reservados.
      </footer>
    </div>
  );
}
