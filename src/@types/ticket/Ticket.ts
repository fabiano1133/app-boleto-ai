import { PaymentStatusEnum } from "@/components/TicketList/Type/Ticket";

export interface Ticket {
  _id: string;
  id: string;
  title: string;
  beneficiarysName: string;
  tenantId: string;
  value: number;
  expirationDate: Date;
  status: PaymentStatusEnum;
  description: string;
  category: string;
  digitableLine: string;
  issueAt: Date;
  notes: string;
}
