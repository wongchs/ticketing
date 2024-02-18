import { getTickets } from "@/actions/action";
import Tickets from "@/components/Tickets";
import Link from "next/link";

export default async function Home() {
  const tickets = await getTickets();
  console.log(tickets);

  return (
    <>
      <header className="flex justify-between items-center px-8 py-2">
        <h1 className="text-2xl">Tickets</h1>
        <Link href="/new">New</Link>
      </header>
      <ul className="pl-4">
        {tickets.map((ticket) => (
          <Tickets key={ticket.id} {...ticket} />
        ))}
      </ul>
    </>
  );
}
