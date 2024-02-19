import Link from "next/link";
import DeleteTicket from "./DeleteTicket";
import { getFilteredTickets } from "@/actions/action";

type TicketItemProps = {
  query: string;
  currentPage: number;
};

async function Tickets({ query, currentPage }: TicketItemProps) {
  const tickets = await getFilteredTickets(query, currentPage);

  return (
    <>
      <div className="px-4 flex flex-col gap-4">
        {tickets.map((ticket) => {
          let statusStyle = "";
          switch (ticket.status) {
            case "OPEN":
              statusStyle = "bg-red-500";
              break;
            case "IN_PROGRESS":
              statusStyle = "bg-yellow-500";
              break;
            case "RESOLVED":
              statusStyle = "bg-green-500";
              break;
            case "CLOSED":
              statusStyle = "bg-gray-500";
              break;
            default:
              statusStyle = "bg-white";
          }

          return (
            <div
              className={`border rounded border-solid flex justify-between ${statusStyle} shadow-lg`}
              key={ticket.id}
            >
              <div className="px-4 py-2">
                <p>Issue: {ticket.title}</p>
                <p>Description: {ticket.description}</p>
                <p>{ticket.status}</p>
              </div>
              <div className="flex flex-row gap-2 items-center bg-slate-100 p-6">
                <Link
                  className="border border-blue-600 bg-blue-600 text-slate-50 px-2 py-1 rounded hover:bg-slate-50 hover:text-blue-600 focus-within:bg-slate-700 outline-none"
                  href={`/entry/${ticket.id}/edit`}
                >
                  <span>Edit</span>
                </Link>
                <DeleteTicket id={ticket.id} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Tickets;
