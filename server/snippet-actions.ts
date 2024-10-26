'use server';

import { db } from '@/lib/db';
import { snippets, snippetTags, tags } from '@/lib/db/schema';
import { Snippet } from '@/types/snippet';
import { auth } from '@clerk/nextjs/server';
import { eq, and, ilike, or } from 'drizzle-orm';


/**
 * Fetches snippets from the database based on the provided parameters.
 *
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=6] - The number of snippets to fetch per page.
 * @param {string} [search=''] - The search term to filter snippets by title or description.
 * @param {string} [technology=''] - The technology/language to filter snippets by.
 * @returns {Promise<Snippet[]>} A promise that resolves to an array of snippets.
 *
 * @throws Will return an empty array if there is an error fetching snippets or if the user is not authenticated.
 */
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

/**
 * Retrieves a snippet by its ID for the authenticated user.
 *
 * @param {string} id - The ID of the snippet to retrieve.
 * @returns {Promise<Snippet | null>} A promise that resolves to the snippet if found, or null if not found or if the user is not authenticated.
 *
 * @throws Will log an error to the console if there is an issue fetching the snippet.
 */
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