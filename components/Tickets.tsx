import Link from "next/link";

type TicketItemProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

function Tickets({ id, title, description, status }: TicketItemProps) {
  return (
    <>
      <div className="py-2 px-4 border border-solid border-slate-900">
        <p>Issue: {title}</p>
        <p>Description: {description}</p>
        <p>{status}</p>
        <Link className="rounded-md border px-6 py-2" href={`/entry/${id}/edit`}>
          Edit
        </Link>
      </div>
    </>
  );
}

export default Tickets;
