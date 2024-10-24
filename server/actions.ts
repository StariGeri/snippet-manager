'use server';

import { db } from '@/lib/db';
import { snippets } from '@/lib/db/schema';

export async function getAllSnippets() {
  console.log('Fetching snippets');
  try {
    const data = await db.select().from(snippets);
    console.log('Fetched snippets', data);
    return { data };
  } catch (error) {
    return { error: error };
  }
}
