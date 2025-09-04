"use client";

import { FooterLinks } from "./FooterLinks";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="border-t bg-background py-10 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <FooterLinks />

          <div className="flex flex-col items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                <Image
                  src={"boleto-ai-logo.svg"}
                  width={110}
                  height={40}
                  alt="logo da marca boleto ai"
                />
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                Construindo soluções modernas para web com foco em performance e
                usabilidade.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Boleto AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
