import SnippetList from "@/components/snippets/SnippetsList";
import { dummySnippets } from "@/constants";

export default function SnippetsPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Snippets</h1>
            <SnippetList snippets={dummySnippets} />
        </div>
    )
}