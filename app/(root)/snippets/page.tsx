import SnippetList from "@/components/snippets/SnippetsList";
import { dummySnippets } from "@/constants";
import { auth } from "@clerk/nextjs/server";

export default async function SnippetsPage() {

    const { userId } = await auth()

    console.log(userId)
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Snippets</h1>
            <SnippetList snippets={dummySnippets} />
        </div>
    )
}