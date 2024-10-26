import { Snippet } from "@/types/snippet";
import SnippetCard from "./SnippetCard";

const SnippetList = ({ snippets }: { snippets: Snippet[] }) => {

    if (snippets.length === 0) {
        return <div className="flex justify-center items-center mx-auto pt-6 max-w-[400px] text-center">
            No snippets found. Use the &quot;+&quot; button on the sidebar to create snippets.
        </div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
        </div>
    )
}

export default SnippetList;