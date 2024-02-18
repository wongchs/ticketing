"use server";
import { prisma } from "@/app/db";
import { Status } from "@/utils/status";
import { z } from "zod";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
