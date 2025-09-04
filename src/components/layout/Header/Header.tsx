"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { JwtPayload } from "@/api/auth/ultils";
import SheetProfile from "@/components/CustomSheet/SheetProfile";

interface HeaderProps {
  user?: JwtPayload | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="flex top-0 left-0 right-0 z-50 shadow-sm bg-gray-800 h-16 justify-between p-8 fixed w-full">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <Image src="/boleto-ai-logo.svg" alt="Logo" width={110} height={40} />
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-amber-100 font-medium">
        <Link href="/dashboard">
          <span
            className={`font-sans font-normal transition-colors ${
              isActive("/dashboard")
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-600"
            }`}
          >
            Resumo
          </span>
        </Link>
        <Link href={"/tickets"}>
          <span
            className={`font-sans font-normal transition-colors ${
              isActive("/tickets")
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-600"
            }`}
          >
            Boletos
          </span>
        </Link>
        <Link href={"/reports"}>
          <span
            className={`font-sans font-normal transition-colors ${
              isActive("/reports")
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-600"
            }`}
          >
            Relatórios
          </span>
        </Link>
        {/* <Link  href={"/bank-account"}>
          <span
            className={`font-sans font-normal transition-colors ${
              isActive("/bank-account")
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-600"
            }`}
          >
            Conta Digital
          </span>
        </Link> */}
        <Link href={"/smart-finance"}>
          <span
            className={`font-sans font-normal transition-colors ${
              isActive("/smart-finance")
                ? "text-green-400 border-b-2 border-green-400 pb-1"
                : "text-white hover:text-green-600"
            }`}
          >
            Assistente Financeiro
          </span>
        </Link>
      </nav>
      {/* {Avatar} */}
      <div className="flex items-center">
        <SheetProfile user={user} />
      </div>
    </header>
  );
}
