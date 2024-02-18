import Link from "next/link";
import { createTicket } from "@/actions/action";
import { Status } from "@/utils/status";

export default function Page() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTicket} className="flex gap-2 flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label htmlFor="title">Description</label>
        <input
          type="text"
          name="description"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <label htmlFor="status">Status</label>
        <select
          name="status"
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        >
          {Object.values(Status).map((status) => (
            <option value={status}>{status}</option>
          ))}
        </select>
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-800 px-2 py-1 rounded hover:bg-slate-700 hover:text-slate-300 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-800 px-2 py-1 rounded hover:bg-slate-700 hover:text-slate-300 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
