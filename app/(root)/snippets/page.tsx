import SnippetList from "@/components/snippets/SnippetsList";
import { dummySnippets } from "@/constants";

export default async function SnippetsPage() {
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Snippets library</h1>
            <SnippetList snippets={dummySnippets} />
        </div>
    )
}