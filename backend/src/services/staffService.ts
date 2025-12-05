import { db } from '../db/client';
import { staff } from '../db/schema';
import { asc } from 'drizzle-orm';

export async function listStaff() {
  return db.select().from(staff).orderBy(asc(staff.id));
}
