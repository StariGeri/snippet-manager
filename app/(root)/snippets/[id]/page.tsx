export default function SnippetPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Snippet {params.id}</h1>
        </div>
    )
}