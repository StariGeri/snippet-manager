import * as z from 'zod';

export const folderSchema = z.object({
  name: z.string().min(1, 'Folder name is required').max(255, 'Folder name must be less than 255 characters'),
});
