'use client'

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import SnippetList from "@/components/snippets/SnippetsList";
import { getSnippets } from "@/server/actions";
import { Snippet } from "@/types/snippet";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LoaderCircle } from 'lucide-react';
import SnippetCardSkeleton from '@/components/snippets/SnippetLoadingSkeleton';

export default function SnippetsPage(): JSX.Element {
    const { ref, inView } = useInView()

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['snippets'],
        queryFn: async ({ pageParam = 1 }) => {
            const snippets = await getSnippets(pageParam);
            return snippets;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 6 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage, hasNextPage])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Snippets library</h1>
            {status === 'pending' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <SnippetCardSkeleton key={index} />
                    ))}
                </div>
            ) : status === 'error' ? (
                <Alert variant="destructive">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        An error occurred while fetching snippets. Please refresh the page.
                    </AlertDescription>
                </Alert>
            ) : (
                <>
                    <SnippetList snippets={data?.pages.flat() || []} />
                    <div ref={ref} className="h-10 mt-4">
                        {isFetchingNextPage && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(3)].map((_, index) => (
                                    <SnippetCardSkeleton key={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}