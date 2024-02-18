type TicketItemProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

function Tickets({ id, title, description, status }: TicketItemProps) {
  return (
    <>
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{status}</p>
    </>
  );
}

export default Tickets;
