import { db } from '../db/client';
import { destinations, inquiries } from '../db/schema';
import { eq } from 'drizzle-orm';

export type CreateInquiryInput = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  destinationSlug?: string;
};

export async function createInquiry(input: CreateInquiryInput) {
  let destinationId: number | null = null;

  if (input.destinationSlug) {
    const [dest] = await db
      .select({ id: destinations.id })
      .from(destinations)
      .where(eq(destinations.slug, input.destinationSlug))
      .limit(1);
    if (dest) {
      destinationId = dest.id;
    }
  }

  const composedMessage = [input.subject, input.message].filter(Boolean).join(' | ');

  const [inserted] = await db
    .insert(inquiries)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: composedMessage || null,
      destinationId
    })
    .returning({ id: inquiries.id });

  return inserted;
}
