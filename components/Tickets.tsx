import Link from "next/link";
import DeleteTicket from "./DeleteTicket";

type TicketItemProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

function Tickets({ id, title, description, status }: TicketItemProps) {
  let statusStyle = "";

  switch (status) {
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
    <>
      <div
        className={`py-2 px-4 border border-solid border-slate-900 ${statusStyle}`}
      >
        <p>Issue: {title}</p>
        <p>Description: {description}</p>
        <p>{status}</p>
        <Link
          className="rounded-md border px-6 py-2"
          href={`/entry/${id}/edit`}
        >
          Edit
        </Link>
        <DeleteTicket id={id} />
      </div>
    </>
  );
}

export default Tickets;
