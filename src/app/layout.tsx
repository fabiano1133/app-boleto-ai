import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MyToast } from "@/components/Toast/MyToast";

export const metadata: Metadata = {
  title: "Boleto AI",
  description: "Seus boletos de forma inteligente",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["greek"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <main>{children}</main>
        <MyToast />
      </body>
    </html>
  );
}
