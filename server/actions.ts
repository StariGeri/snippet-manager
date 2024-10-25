'use server';

import { db } from '@/lib/db';
import { snippets, snippetTags, tags } from '@/lib/db/schema';
import { Snippet } from '@/types/snippet';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

export async function getSnippets(page: number = 1, limit: number = 6): Promise<Snippet[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }

  try {
    const offset = (page - 1) * limit;
    const snippetsData = await db.select().from(snippets).where(eq(snippets.userId, userId)).limit(limit).offset(offset);

    const snippetsWithTags = await Promise.all(
      snippetsData.map(async (snippet) => {
        const snippetTagsData = await db
          .select({
            id: tags.id,
            name: tags.name,
          })
          .from(snippetTags)
          .innerJoin(tags, eq(snippetTags.tagId, tags.id))
          .where(eq(snippetTags.snippetId, snippet.id));

        return {
          ...snippet,
          tags: snippetTagsData,
        };
      }),
    );

    return snippetsWithTags;
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return [];
  }
}

export async function getSnippetById(id: string): Promise<Snippet | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const snippetData = await db
      .select()
      .from(snippets)
      .where(and(eq(snippets.id, id), eq(snippets.userId, userId)))
      .limit(1);

    if (snippetData.length === 0) {
      return null;
    }

    const snippet = snippetData[0];

    const snippetTagsData = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(snippetTags)
      .innerJoin(tags, eq(snippetTags.tagId, tags.id))
      .where(eq(snippetTags.snippetId, id));

    const fullSnippet: Snippet = {
      ...snippet,
      tags: snippetTagsData,
    };

    return fullSnippet;
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return null;
  }
}
