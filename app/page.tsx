import { getTickets } from "@/actions/action";
import Search from "@/components/Search";
import Tickets from "@/components/Tickets";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const tickets = await getTickets();
  console.log(tickets);

  return (
    <>
      <header className="flex justify-between items-center px-8 py-2">
        <h1 className="text-2xl">Tickets</h1>
        <Link href="/new">New</Link>
      </header>
      <hr />
      <div className="px-4 py-6">
        <Search placeholder="Search tickets..." />
      </div>
      <Tickets query={query} />
    </>
  );
}
