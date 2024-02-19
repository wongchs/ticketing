import { getTicket, updateTicket } from "@/actions/action";
import { Status } from "@/utils/status";
import Link from "next/link";

async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const ticket = await getTicket(id);
  const updateTicketWithId = updateTicket.bind(null, id);

  if (!ticket) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>{ticket.title}</h1>
      <form action={updateTicketWithId} className="flex gap-2 flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={ticket.title}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label htmlFor="title">Description</label>
        <input
          type="text"
          name="description"
          defaultValue={ticket.description}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          defaultValue={ticket.status}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        >
          {Object.values(Status).map((status) => (
            <option value={status}>{status}</option>
          ))}
        </select>
        <div className="flex gap-1 justify-end">
          <Link
            href="/"
            className="border border-slate-300 text-slate-800 px-2 py-1 rounded hover:bg-slate-700 hover:text-slate-300 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-800 px-2 py-1 rounded hover:bg-slate-700 hover:text-slate-300 focus-within:bg-slate-700 outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
