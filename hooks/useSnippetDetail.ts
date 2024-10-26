import { Snippet } from '@/types/snippet';
import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { deleteSnippet } from '@/server/snippet-actions';
import { useQueryClient } from '@tanstack/react-query';

/**
 * This hook provides the logic for the snippet detail page.
 */
export const useSnippetDetail = (snippet: Snippet) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  const handleEdit = () => {
    router.push(`/snippets/edit/${snippet.id}`);
  };

  const handleDelete = async () => {
    const result = await deleteSnippet(snippet.id);
    if (result.success) {
      toast({
        title: '✅Snippet deleted',
        description: 'Your snippet has been deleted successfully.',
      });
      router.push('/snippets');
      queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'An error occurred while deleting the snippet.',
        variant: 'destructive',
      });
    }
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet]);

  return {
    handleCopy,
    handleEdit,
    handleDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    copied,
  };
};
