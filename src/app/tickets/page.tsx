import { getAuthToken, getUserFromToken } from "@/api/auth/ultils";
import TicketTable from "@/components/TicketTable/TicketTable";

export default async function TicketsPage() {
  const { token } = await getAuthToken();
  const user = await getUserFromToken(token);
  return <TicketTable user={user} />;
}
