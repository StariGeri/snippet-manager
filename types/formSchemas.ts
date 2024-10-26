import * as z from 'zod';

export const folderSchema = z.object({
  name: z.string().min(1, 'Folder name is required').max(255, 'Folder name must be less than 255 characters'),
});

export const snippetSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().max(255, "Description must be less than 255 characters").optional(),
  language: z.string().min(1, "Technology is required"),
  code: z.string().min(1, "Code is required"),
  folderId: z.string().optional(),
  tags: z.array(z.string()).max(3, "Maximum 3 tags allowed"),
})
