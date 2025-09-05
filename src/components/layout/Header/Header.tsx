"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { JwtPayload } from "@/api/auth/ultils";
import SheetProfile from "@/components/CustomSheet/SheetProfile";
import { useState } from "react";

interface HeaderProps {
  user?: JwtPayload | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { href: "/dashboard", label: "Resumo" },
    { href: "/tickets", label: "Boletos" },
    { href: "/reports", label: "Relatórios" },
    { href: "/smart-finance", label: "Assistente Financeiro" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/boleto-ai-logo.svg"
              alt="Logo"
              width={110}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-amber-100 font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`font-sans font-normal transition-colors ${
                  isActive(link.href)
                    ? "text-green-400 border-b-2 border-green-400 pb-1"
                    : "text-white hover:text-green-600"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Profile + Mobile menu button */}
        <div className="flex items-center gap-4">
          <SheetProfile user={user} />
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      <div
        className={`md:hidden bg-gray-800 text-amber-100 px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 py-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`block font-sans font-normal transition-colors ${
                  isActive(link.href)
                    ? "text-green-400 border-b-2 border-green-400 pb-1"
                    : "text-white hover:text-green-600"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
