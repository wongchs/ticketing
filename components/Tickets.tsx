import Link from "next/link";
import DeleteTicket from "./DeleteTicket";
import { getFilteredTickets } from "@/actions/action";

type TicketItemProps = {
  query: string;
};

async function Tickets({ query }: TicketItemProps) {
  const tickets = await getFilteredTickets(query);

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
              className={`px-4 py-2 border border-solid border-slate-900 flex justify-between ${statusStyle}`}
              key={ticket.id}
            >
              <div className="flex-col">
                <p>Issue: {ticket.title}</p>
                <p>Description: {ticket.description}</p>
                <p>{ticket.status}</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Link
                  className="rounded-md border px-4 py-2 hover:bg-blue-500"
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
