"use server";

import { db } from '@/lib/db';
import { snippets, folders, SelectFolder, SelectSnippet } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface FoldersAndSnippets {
  folders: SelectFolder[];
  snippets: SelectSnippet[];
}

/**
 * Retrieves folders and snippets associated with the authenticated user.
 *
 * @returns {Promise<FoldersAndSnippets>} A promise that resolves to an object containing the user's folders and snippets.
 *
 * @throws Will log an error and return empty arrays for folders and snippets if there is an issue with the database query.
 */

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

/**
 * Creates a new folder for the authenticated user.
 *
 * @param {string} name - The name of the folder to be created.
 * @returns {Promise<{ success: boolean, error?: string }>} - An object indicating the success or failure of the operation.
 * @throws {Error} - Throws an error if the user is not authenticated or if a folder with the same name already exists.
 */
export async function createFolder(name: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    // Check if folder with the same name already exists for this user
    const existingFolder = await db
      .select()
      .from(folders)
      .where(and(eq(folders.name, name), eq(folders.userId, userId)))
      .limit(1);

    if (existingFolder.length > 0) {
      throw new Error('A folder with this name already exists');
    }

    // Create new folder
    await db.insert(folders).values({
      name,
      userId,
    });

    revalidatePath('/snippets');
    return { success: true };
  } catch (error) {
    console.error('Error creating folder:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Renames a folder for the authenticated user.
 *
 * @param {string} folderId - The ID of the folder to rename.
 * @param {string} newName - The new name for the folder.
 * @returns {Promise<{ success: boolean; error?: string }>} - An object indicating the success or failure of the operation.
 * @throws {Error} - Throws an error if the user is not authenticated or if a folder with the new name already exists.
 */
export async function renameFolder(folderId: string, newName: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    // Check if folder with the new name already exists for this user
    const existingFolder = await db
      .select()
      .from(folders)
      .where(and(eq(folders.name, newName), eq(folders.userId, userId)))
      .limit(1);

    if (existingFolder.length > 0) {
      throw new Error('A folder with this name already exists');
    }

    // Rename the folder
    await db
      .update(folders)
      .set({ name: newName })
      .where(and(eq(folders.id, folderId), eq(folders.userId, userId)));

    revalidatePath('/snippets');
    return { success: true };
  } catch (error) {
    console.error('Error renaming folder:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Deletes a folder by its ID if the user is authenticated.
 *
 * @param {string} folderId - The ID of the folder to be deleted.
 * @returns {Promise<{ success: boolean, error?: string }>} - An object indicating the success or failure of the operation.
 * @throws {Error} - Throws an error if the user is not authenticated.
 */
export async function deleteFolder(folderId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('User not authenticated');
  }

  try {
    // Delete the folder
    await db.delete(folders).where(and(eq(folders.id, folderId), eq(folders.userId, userId)));

    revalidatePath('/snippets');
    return { success: true };
  } catch (error) {
    console.error('Error deleting folder:', error);
    return { success: false, error: (error as Error).message };
  }
}
