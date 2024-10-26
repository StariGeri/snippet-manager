'use client';

import { Snippet } from "@/types/snippet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Prism from "prismjs"
import { useEffect, useState } from "react"
import { getLanguageIcon } from "@/hooks/useLanguageIcon";
import { CopyIcon } from "lucide-react";

// Import Prism themes and languages
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-java";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-elixir";
import "prismjs/components/prism-go";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-less";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-json";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-git";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-haskell";
import "prismjs/components/prism-perl";
import "prismjs/components/prism-r";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-scala";

export default function SnippetDetail({ snippet }: { snippet: Snippet }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  useEffect(() => {
    Prism.highlightAll()
  }, [snippet])

  const LanguageIcon = getLanguageIcon(snippet.language);

  return (
    <div className="inset-0 flex min-h-[80dvh] w-full h-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <Card className="container w-full max-w-3xl mx-auto mt-8 bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LanguageIcon className="h-5 w-5" />
            <span className="text-lg md:text-xl lg:text-2xl">{snippet.title}</span>
          </CardTitle>
          <CardDescription className="text-base">{snippet.description}</CardDescription>
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
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute right-4 top-4 flex items-center text-sm text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none px-2 py-1 transition-all duration-300"
            >
              <span
                className={`transition-all duration-300`}
              >
                <CopyIcon size={16} />
              </span>
              {copied && (
                <span className="ml-1 opacity-100 transition-opacity duration-300">
                  Copied!
                </span>
              )}
            </button>
            <pre className="p-4 rounded bg-muted overflow-x-auto">
              <code className={`language-${snippet.language.toLowerCase()}`}>
                {snippet.code}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}