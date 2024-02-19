import Link from "next/link";
import DeleteTicket from "./DeleteTicket";
import { getFilteredTickets } from "@/actions/action";

type TicketItemProps = {
  query: string;
};

async function Tickets({ query }: TicketItemProps) {
  let statusStyle = "";
  const tickets = await getFilteredTickets(query);

  // switch (status) {
  //   case "OPEN":
  //     statusStyle = "bg-red-500";
  //     break;
  //   case "IN_PROGRESS":
  //     statusStyle = "bg-yellow-500";
  //     break;
  //   case "RESOLVED":
  //     statusStyle = "bg-green-500";
  //     break;
  //   case "CLOSED":
  //     statusStyle = "bg-gray-500";
  //     break;
  //   default:
  //     statusStyle = "bg-white";
  // }

  return (
    <>
      <div
        className={`py-2 px-4 border border-solid border-slate-900 ${statusStyle}`}
      >
        {tickets.map((ticket) => (
          <div key={ticket.id}>
            <p>Issue: {ticket.title}</p>
            <p>Description: {ticket.description}</p>
            <p>{ticket.status}</p>
            <Link
              className="rounded-md border px-6 py-2"
              href={`/entry/${ticket.id}/edit`}
            >
              Edit
            </Link>
            <DeleteTicket id={ticket.id} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Tickets;
