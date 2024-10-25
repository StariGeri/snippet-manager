import SnippetDetail from "@/components/snippets/SnippetDetail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getSnippetById } from "@/server/actions";

export default async function SnippetPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const snippet = await getSnippetById(id);

    if (snippet === null) {
        <Alert variant="destructive">
            <AlertTitle>Snippet not found</AlertTitle>
            <AlertDescription>The snippet you are looking for does not exist.</AlertDescription>
        </Alert>
    } else {
        // Use the snippet data
        return <SnippetDetail snippet={snippet} />;
    }
}