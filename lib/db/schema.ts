import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";


// Folders table
export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


// Snippets table
export const snippets = pgTable("snippets", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description"),
  language: varchar("language", { length: 50 }),
  code: text("code").notNull(),
  folderId: uuid("folder_id").references(() => folders.id),
  userId: varchar("user_id", { length: 255 }).notNull(), // Clerk user ID
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// New Tags table
export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New SnippetTags junction table
export const snippetTags = pgTable("snippet_tags", {
  snippetId: uuid("snippet_id").notNull().references(() => snippets.id),
  tagId: uuid("tag_id").notNull().references(() => tags.id)
});

// Types

export type InsertFolder = typeof folders.$inferInsert;
export type SelectFolder = typeof folders.$inferSelect;
export type InsertSnippet = typeof snippets.$inferInsert;
export type SelectSnippet = typeof snippets.$inferSelect;