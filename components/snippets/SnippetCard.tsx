'use client';

import { Snippet } from "@/types/snippet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Prism from "prismjs";
import Link from "next/link";
import { useEffect } from "react";


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
import { getLanguageIcon } from "@/hooks/useLanguageIcon";




const SnippetCard = ({ snippet }: { snippet: Snippet }) => {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const previewLines = 5;
    const codeLines = snippet.code.split('\n');
    const previewCode = codeLines.slice(0, previewLines).join('\n');

    const LanguageIcon = getLanguageIcon(snippet.language);

    return (
        <Link href={`/snippets/${snippet.id}`} passHref prefetch={true}>
            <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LanguageIcon className="h-5 w-5" />
                        {snippet.title}
                    </CardTitle>
                    {snippet.description && (
                        <CardDescription>{snippet.description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex flex-wrap gap-2">
                        <Badge variant="default">{snippet.language}</Badge>
                        {snippet.tags?.map((tag) => (
                            <Badge key={tag.id + Math.random} variant="secondary">
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                    <div className="relative overflow-hidden">
                        <pre className="p-4 rounded bg-muted text-sm max-h-[150px] overflow-hidden whitespace-pre-wrap break-words">
                            <code className={`language-${snippet.language.toLowerCase()}`}>
                                {previewCode}
                            </code>
                        </pre>
                        <div className="h-10 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/70 to-transparent backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default SnippetCard;