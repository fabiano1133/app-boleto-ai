import { getAuthToken, getUserFromToken } from "@/api/auth/ultils";
import Dashboard from "@/components/Dashboard/dashboard";

export default async function DashboardPage() {
  const { token } = await getAuthToken();
  const user = await getUserFromToken(token);
  return <Dashboard user={user} />;
}
