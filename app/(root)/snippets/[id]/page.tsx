import SnippetDetail from "@/components/snippets/SnippetDetail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSnippetById } from "@/server/snippet-actions";


type Params = Promise<{ id: string }>

export default async function SnippetPage(props: Readonly<{ params: Params }>) {
    const id = (await props.params).id;

    const snippet = await getSnippetById(id);

    if (snippet === null) {
        return (
            <Alert variant="destructive">
                <AlertTitle>Snippet not found</AlertTitle>
                <AlertDescription>The snippet you are looking for does not exist.</AlertDescription>
            </Alert>
        );
    } else {
        return <SnippetDetail snippet={snippet} />;
    }
}