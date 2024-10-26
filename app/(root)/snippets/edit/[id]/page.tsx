import { getSnippetById } from '@/server/snippet-actions'
import EditSnippetPage from '@/components/snippets/EditSnippetPage';

export default async function EditSnippetRoute({ params }: { params: { id: string } }) {
    const { id } = await params;

    const snippet = await getSnippetById(id);

  if (!snippet) {
    return <div>Snippet not found</div>
  }

  return <EditSnippetPage snippet={snippet} />
}