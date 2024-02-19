"use server";
import { prisma } from "@/app/db";
import { Status } from "@/utils/status";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  title: z.string({ invalid_type_error: "Please enter a title." }),
  description: z.string({ invalid_type_error: "Please enter a description." }),
  status: z.enum(
    [Status.OPEN, Status.IN_PROGRESS, Status.RESOLVED, Status.CLOSED],
    {
      invalid_type_error: "Please select a ticket status.",
    }
  ),
});

const CreateTicket = FormSchema.omit({
  id: true,
});

const UpdateTicket = FormSchema.omit({
  id: true,
});

export async function createTicket(data: FormData) {
  const validatedFields = CreateTicket.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    status: data.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Ticket.",
    };
  }

  const { title, description, status } = validatedFields.data;

  try {
    console.log(validatedFields.data);
    await prisma.ticket.create({
      data: {
        title,
        description,
        status,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Ticket.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function getTickets() {
  return await prisma.ticket.findMany();
}

export async function getTicket(id: string) {
  return await prisma.ticket.findUnique({
    where: { id },
  });
}

export async function updateTicket(id: string, data: FormData) {
  const validatedFields = UpdateTicket.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    status: data.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Ticket.",
    };
  }

  const { title, description, status } = validatedFields.data;

  try {
    await prisma.ticket.update({
      where: { id },
      data: {
        title,
        description,
        status,
      },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteTicket(id: string) {
  await prisma.ticket.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
}

const ITEMS_PER_PAGE = 6;
export async function getFilteredTickets(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return tickets;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch tickets.");
  }
}

export async function getTicketsTotalPages(query: string) {
  try {
    const count = await prisma.ticket.count({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { status: { contains: query } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of tickets.");
  }
}
