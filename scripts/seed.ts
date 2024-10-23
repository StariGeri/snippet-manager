import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { folders, snippets, tags, snippetTags } from '@/lib/db/schema';

async function main() {
  const db = drizzle();

  // Insert folders
  const folder1 = await db
    .insert(folders)
    .values({
      name: 'Frontend Snippets',
      userId: 'user123',
    })
    .returning();

  const folder2 = await db
    .insert(folders)
    .values({
      name: 'Backend Snippets',
      userId: 'user123',
    })
    .returning();

  // Insert snippets
  const snippet1 = await db
    .insert(snippets)
    .values({
      title: 'Fetch API Request',
      description: 'Example of using Fetch API in JavaScript',
      language: 'JavaScript',
      code: `fetch('https://api.example.com/data')
           .then(response => response.json())
           .then(data => console.log(data));`,
      folderId: folder1[0].id,
      userId: 'user123',
    })
    .returning();

  const snippet2 = await db
    .insert(snippets)
    .values({
      title: 'Basic Express Server',
      description: 'Simple Express.js server setup',
      language: 'JavaScript',
      code: `const express = require('express');
           const app = express();
           app.get('/', (req, res) => res.send('Hello World!'));
           app.listen(3000, () => console.log('Server running'));`,
      folderId: folder2[0].id,
      userId: 'user123',
    })
    .returning();

  // Insert tags
  const tag1 = await db
    .insert(tags)
    .values({
      name: 'JavaScript',
      userId: 'user123',
    })
    .returning();

  const tag2 = await db
    .insert(tags)
    .values({
      name: 'API',
      userId: 'user123',
    })
    .returning();

  const tag3 = await db
    .insert(tags)
    .values({
      name: 'Express',
      userId: 'user123',
    })
    .returning();

  // Insert snippetTags (junction entries)
  await db.insert(snippetTags).values([
    {
      snippetId: snippet1[0].id,
      tagId: tag1[0].id,
    },
    {
      snippetId: snippet1[0].id,
      tagId: tag2[0].id,
    },
    {
      snippetId: snippet2[0].id,
      tagId: tag1[0].id,
    },
    {
      snippetId: snippet2[0].id,
      tagId: tag3[0].id,
    },
  ]);

  console.log('Database seeded successfully!');
}

main();
