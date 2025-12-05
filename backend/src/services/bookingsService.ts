import { db } from '../db/client';
import { bookings, destinations } from '../db/schema';
import { eq } from 'drizzle-orm';

export type CreateBookingInput = {
  name: string;
  contact: string;
  email?: string;
  phone?: string;
  destinationSlug?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  message?: string;
};

export async function createBooking(input: CreateBookingInput) {
  let destinationId: number | null = null;

  if (input.destinationSlug) {
    const [dest] = await db
      .select({ id: destinations.id })
      .from(destinations)
      .where(eq(destinations.slug, input.destinationSlug))
      .limit(1);

    if (!dest) {
      throw new Error('destination_not_found');
    }

    destinationId = dest.id;
  }

  const toDateOnly = (value?: string) => (value ? value.slice(0, 10) : null);

  const [inserted] = await db
    .insert(bookings)
    .values({
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      contact: input.contact,
      destinationId,
      startDate: toDateOnly(input.startDate),
      endDate: toDateOnly(input.endDate),
      guests: input.guests ?? null,
      message: input.message ?? null
    })
    .returning({ id: bookings.id });

  return inserted;
}
