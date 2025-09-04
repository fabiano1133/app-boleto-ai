import { Ticket } from "../ticket/Ticket";

export interface Tenant {
  id: string;
  name: string;
  email: string;
  loginEmail: string;
  cpfCnpj: string;
  mobilePhone: string;
  address: string;
  addressNumber: string;
  city: string;
  state: string;
  complement: string | null;
  province: string;
  postalCode: string;
  password: string;
  isSubscriber: boolean;
  tickets: Ticket;
}
