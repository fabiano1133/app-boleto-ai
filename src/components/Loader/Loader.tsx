"use client";

import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-6">
      <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
      <span className="ml-2 text-sm text-muted-foreground">Carregando...</span>
    </div>
  );
}
