'use server';

import { db } from '@/lib/db';
import { snippets, snippetTags, tags, folders, SelectFolder, SelectSnippet } from '@/lib/db/schema';
import { Snippet } from '@/types/snippet';
import { auth } from '@clerk/nextjs/server';
import { eq, and, ilike, or } from 'drizzle-orm';

interface FoldersAndSnippets {
  folders: SelectFolder[];
  snippets: SelectSnippet[];
}

export async function getFoldersAndSnippets(): Promise<FoldersAndSnippets> {
  const { userId } = await auth();

  if (!userId) {
    return { folders: [], snippets: [] };
  }

  try {
    const userFolders = await db.select().from(folders).where(eq(folders.userId, userId));
    const userSnippets = await db.select().from(snippets).where(eq(snippets.userId, userId));

    return { folders: userFolders, snippets: userSnippets };
  } catch (error) {
    console.error('Error fetching folders and snippets:', error);
    return { folders: [], snippets: [] };
  }
}

export async function getSnippets(page: number = 1, limit: number = 6, search: string = '', technology: string = ''): Promise<Snippet[]> {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }


  try {
    const offset = (page - 1) * limit;

    const conditions = [eq(snippets.userId, userId), or(ilike(snippets.title, `%${search}%`), ilike(snippets.description, `%${search}%`))];

    // Add technology condition if it's provided
    if (technology) {
      conditions.push(eq(snippets.language, technology.toLowerCase()));
    }

    // Apply the conditions to the query
    const query = db
      .select()
      .from(snippets)
      .where(and(...conditions)) // Spread conditions here
      .limit(limit)
      .offset(offset);

    const snippetsData = await query;

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
