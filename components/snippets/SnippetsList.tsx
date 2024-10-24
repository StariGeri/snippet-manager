import { SnippetCardItem } from "@/types/snippet";
import SnippetCard from "./SnippetCard";

const SnippetList = ({ snippets }: { snippets: SnippetCardItem[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
                <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
        </div>
    )
}

export default SnippetList;