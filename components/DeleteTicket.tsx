import { deleteTicket } from "@/actions/action";

function DeleteTicket({ id }: { id: string }) {
  const deleteTicketWithId = deleteTicket.bind(null, id);

  return (
    <div>
      <form action={deleteTicketWithId}>
        <button className="rounded-md border px-4 py-2 hover:bg-red-500">
          Delete
        </button>
      </form>
    </div>
  );
}

export default DeleteTicket;
