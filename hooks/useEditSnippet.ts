import { getUserFolders } from '@/server/folder-actions';
import { useEffect, useState } from 'react';
import { toast } from './use-toast';
import { updateSnippet } from '@/server/snippet-actions';
import { snippetSchema } from '@/types/formSchemas';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

export const useEditSnippet = (snippetId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const result = await getUserFolders();
      if (result.success) {
        setFolders(result.folders || []);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch folders. Please try again.',
          variant: 'destructive',
        });
      }
    };
    fetchFolders();
  }, []);

  const onSubmit = async (data: z.infer<typeof snippetSchema>) => {
    const result = await updateSnippet(snippetId, data);
    if (result.success) {
      toast({
        title: '✅ Snippet updated',
        description: 'Your snippet has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] });
      router.push(`/snippets/${snippetId}`);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'An error occurred while updating the snippet.',
        variant: 'destructive',
      });
    }
  };

  return { folders, onSubmit };
};