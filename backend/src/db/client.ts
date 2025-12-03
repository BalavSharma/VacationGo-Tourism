import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../config/env';
import * as schema from './schema';

const useSsl = env.NODE_ENV === 'production' ? 'require' : undefined;

const client = postgres(env.DATABASE_URL, {
  ssl: useSsl
});

export const db = drizzle(client, { schema });
export { client };
