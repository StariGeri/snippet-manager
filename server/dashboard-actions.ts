'use server'

import { db } from '@/lib/db'
import { snippets, folders, tags, snippetTags } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq, sql, count } from 'drizzle-orm'

export async function getDashboardData() {
  const { userId } = await auth()
  if (!userId) throw new Error('Not authenticated')

  const totalSnippets = await db.select({ count: count() }).from(snippets).where(eq(snippets.userId, userId))
  const totalFolders = await db.select({ count: count() }).from(folders).where(eq(folders.userId, userId))
  const totalTags = await db.select({ count: count() }).from(tags).where(eq(tags.userId, userId))

  const snippetsByLanguage = await db
    .select({
      language: snippets.language,
      count: count(),
    })
    .from(snippets)
    .where(eq(snippets.userId, userId))
    .groupBy(snippets.language)

  const recentSnippets = await db
    .select({
      id: snippets.id,
      title: snippets.title,
      language: snippets.language,
      createdAt: snippets.createdAt,
    })
    .from(snippets)
    .where(eq(snippets.userId, userId))
    .orderBy(sql`${snippets.createdAt} DESC`)
    .limit(6)

  const topTags = await db
    .select({
      name: tags.name,
      count: count(),
    })
    .from(tags)
    .leftJoin(snippetTags, eq(tags.id, snippetTags.tagId))
    .where(eq(tags.userId, userId))
    .groupBy(tags.name)
    .orderBy(sql`count DESC`)
    .limit(5)

  return {
    totalSnippets: totalSnippets[0].count,
    totalFolders: totalFolders[0].count,
    totalTags: totalTags[0].count,
    snippetsByLanguage,
    recentSnippets,
    topTags,
  }
}