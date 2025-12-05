import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../config/env';
import * as schema from './schema';

// Enable SSL if the connection string requests it (e.g., Neon requires sslmode=require)
const sslMode = (() => {
  try {
    const url = new URL(env.DATABASE_URL);
    const mode = url.searchParams.get('sslmode');
    if (mode && mode.toLowerCase() === 'require') return 'require';
  } catch (err) {
    // fallback below
  }
  return env.NODE_ENV === 'production' ? 'require' : undefined;
})();

const client = postgres(env.DATABASE_URL, {
  ssl: sslMode
});

export const db = drizzle(client, { schema });
export { client };
