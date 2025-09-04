"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CustomSelect({
  value,
  onValueChange,
}: CustomSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Contas de consumo">Contas de consumo</SelectItem>
        <SelectItem value="Boletos bancários/Carnês">
          Boletos bancários/Carnês
        </SelectItem>
        <SelectItem value="Boletos de tributos">Boletos de tributos</SelectItem>
        <SelectItem value="Boletos de seguros e serviços financeiros">
          Boletos de seguros e serviços financeiros
        </SelectItem>
        <SelectItem value="Boletos de mensalidades e assinaturas">
          Boletos de mensalidades e assinaturas
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
