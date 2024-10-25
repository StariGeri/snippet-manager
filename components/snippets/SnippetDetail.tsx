'use client';

import { Snippet } from "@/types/snippet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Prism from "prismjs"
import { useEffect } from "react"

export default function SnippetDetail({ snippet }: { snippet: Snippet }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [snippet])

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>{snippet.title}</CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Badge>{snippet.language}</Badge>
          {snippet.tags?.map((tag) => (
            <Badge key={tag.id} variant="outline" className="ml-2">
              {tag.name}
            </Badge>
          ))}
        </div>
        <pre className="p-4 rounded bg-muted overflow-x-auto">
          <code className={`language-${snippet.language.toLowerCase()}`}>
            {snippet.code}
          </code>
        </pre>
      </CardContent>
    </Card>
  )
}