"use client";

import Link from "next/link";

export const footerLinks = [
  {
    title: "Empresa",
    links: [
      {
        label: "Sobre",
        href: "/sobre",
      },
      {
        label: "Carreiras",
        href: "/carreiras",
      },
      {
        label: "Contato",
        href: "/contacts",
      },
    ],
  },
  {
    title: "Produto",
    links: [
      { label: "Funcionalidades", href: "/funcionalidades" },
      { label: "Preços", href: "/precos" },
      { label: "Novidades", href: "/novidades" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidade", href: "/privacidade" },
      { label: "Termos", href: "/termos" },
    ],
  },
];

export const FooterLinks = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
      {footerLinks.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-foreground mb-4">
            {section.title}
          </h3>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
