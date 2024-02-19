import { getTickets, getTicketsTotalPages } from "@/actions/action";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Tickets from "@/components/Tickets";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getTicketsTotalPages(query);
  const tickets = await getTickets();
  console.log(tickets);

  return (
    <>
      <header className="bg-slate-100 flex justify-between items-center px-8 py-2">
        <h1 className="text-2xl">Tickets</h1>
        <Link href="/new">New</Link>
      </header>
      <hr />
      <div className="px-4 py-6">
        <Search placeholder="Search tickets..." />
      </div>
      <Tickets query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
