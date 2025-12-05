import { db } from '../db/client';
import { testimonials } from '../db/schema';
import { asc } from 'drizzle-orm';

export async function listTestimonials() {
  return db.select().from(testimonials).orderBy(asc(testimonials.id));
}
