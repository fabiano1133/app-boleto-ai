import { Ticket } from "@/@types";
import { apiAuth } from "@/app/lib/http/apiAuth";
import { EditTicketFormData } from "@/components/CreateTicketDialog/schema";
import { PaymentStatusEnum } from "@/components/TicketList/Type/Ticket";

export interface InsertTicketBody {
  beneficiarysName: string;
  expirationDate: Date;
  value: number;
}

export interface Metadata {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TicketResponse {
  data: Ticket[];
  metadata: Metadata;
}

export interface UpdateTicketDTO {
  title: FormDataEntryValue | null;
  expirationDate: FormDataEntryValue | Date | null;
  value: number;
  status: FormDataEntryValue | PaymentStatusEnum | null;
}

export const getTicketsByStatus = async (
  status: PaymentStatusEnum
): Promise<Ticket[]> => {
  const api = await apiAuth();
  const response = await api.get(`/api/v1/tickets/by-status?status=${status}`);
  return response.data;
};

export const getTickets = async (page?: number): Promise<TicketResponse> => {
  const api = await apiAuth();
  const response = await api.get(`/api/v1/tickets?page=${page}`);
  return response.data;
};

export const updateTicket = async (
  id: string,
  body: EditTicketFormData
): Promise<TicketResponse> => {
  const api = await apiAuth();
  const response = await api.patch(`/api/v1/tickets/update/${id}`, body);
  return response.data;
};

export const updateTicketToPaid = async (
  id: string
): Promise<TicketResponse> => {
  const api = await apiAuth();
  const response = await api.put(`/api/v1/tickets/update/status/${id}`, {
    status: PaymentStatusEnum.PAID,
  });
  return response.data;
};
