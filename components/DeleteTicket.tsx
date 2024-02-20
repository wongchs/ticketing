import { deleteTicket } from "@/actions/action";

function DeleteTicket({ id }: { id: string }) {
  const deleteTicketWithId = deleteTicket.bind(null, id);

  return (
    <div>
      <form action={deleteTicketWithId}>
        <button className="border border-red-700 bg-red-700 text-slate-50 px-2 py-1 rounded hover:bg-slate-50 hover:text-red-700 focus-within:bg-red-700 outline-none">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteTicket;
