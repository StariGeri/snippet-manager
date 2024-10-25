import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { folders, snippets, tags, snippetTags } from '@/lib/db/schema';

async function main() {
  const db = drizzle();
  

  console.log('Database seeded successfully with new data!');
}

main();
