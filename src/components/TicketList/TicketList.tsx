// "use client";

// import { useEffect, useState } from "react";
// import { ScrollArea } from "../ui/scroll-area";
// import { SkeletonCard } from "../Skeleton/Skeleton";
// import { Ticket } from "@/@types";
// import { getTicketsByExpirationDate } from "@/api/ticketService";
// import { useAuth } from "@/app/lib/auth/useAuth";

// type TicketListProps = {
//   startDate?: string;
//   endDate?: string;
// };

// export const TicketList = ({ startDate, endDate }: TicketListProps) => {
//   const { token } = useAuth();
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!token) return;

//     const fetchTickets = async () => {
//       try {
//         const data = await getTicketsByExpirationDate(
//           token,
//           startDate,
//           endDate
//         );
//         setTickets(data as unknown as Ticket[]);
//       } catch (error) {
//         console.log("Ocorreu um erro ao buscar os boletos", error);
//         setError("Ocorreu um erro ao buscar os boletos");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTickets();
//   }, [token, startDate, endDate]);

//   return (
//     <ul className="space-y-4">
//       <ScrollArea className="h-[302px] w-[440px] rounded-md border p-4">
//         {loading === true ? (
//           <SkeletonCard />
//         ) : error ? (
//           <div className="flex justify-center items-center h-[250px]">
//             <span>{error}</span>
//           </div>
//         ) : !tickets.length ? (
//           <div className="flex justify-center items-center h-[250px]">
//             <span>{`Não existem boletos para a data informada`}</span>
//           </div>
//         ) : (
//           tickets.map((ticket) => (
//             <li
//               key={ticket.id}
//               className="p-4 border rounded-md shadow-sm bg-white mb-3"
//             >
//               <h2 className="text-xl font-semibold">
//                 {ticket.beneficiarysName}
//               </h2>
//               <p className="text-gray-600">Status: {ticket.status}</p>
//               <p className="text-gray-600">
//                 Vencimento:{" "}
//                 {new Date(ticket.expirationDate)
//                   .toISOString()
//                   .slice(0, 10)
//                   .split("-")
//                   .reverse()
//                   .join("/")}
//               </p>
//               <p className="text-gray-600">
//                 Valor R$: {ticket.value.toFixed(2)}
//               </p>
//             </li>
//           ))
//         )}
//       </ScrollArea>
//     </ul>
//   );
// };
