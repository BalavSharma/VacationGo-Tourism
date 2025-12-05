import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '../src/db/client';
import { destinations } from '../src/db/schema';

async function main() {
  const seeds = [
    { slug: 'paro', name: 'Paro', region: 'Western Bhutan', summary: 'Paro Valley, Taktsang Monastery, and scenic hikes.' },
    { slug: 'thimphu', name: 'Thimphu', region: 'Western Bhutan', summary: 'Capital city, Buddha Dordenma, cultural sites.' },
    { slug: 'punakha', name: 'Punakha', region: 'Western Bhutan', summary: 'Punakha Dzong and river valley views.' }
  ];

  for (const seed of seeds) {
    const [existing] = await db
      .select({ id: destinations.id })
      .from(destinations)
      .where(eq(destinations.slug, seed.slug))
      .limit(1);

    if (existing) {
      continue;
    }

    await db.insert(destinations).values(seed);
    console.log(`Inserted destination: ${seed.slug}`);
  }

  console.log('Seeding completed.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
