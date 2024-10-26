import { getSnippetById } from '@/server/snippet-actions'
import EditSnippetPage from '@/components/snippets/EditSnippetPage';

type Params = Promise<{ id: string }>

export default async function EditSnippetRoute(props: { params: Params }) {
  const id = (await props.params).id;

    const snippet = await getSnippetById(id);

  if (!snippet) {
    return <div>Snippet not found</div>
  }

  return <EditSnippetPage snippet={snippet} />
}