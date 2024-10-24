export default async function SnippetPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <div>
            <h1>Snippet {id}</h1>
        </div>
    )
}