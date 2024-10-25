'use client'

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SnippetList from "@/components/snippets/SnippetsList";
import { getSnippets } from "@/server/actions";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import SnippetCardSkeleton from '@/components/snippets/SnippetLoadingSkeleton';
import SnippetFilter from '@/components/snippets/SnippetFilter';

export default function SnippetsPage(): JSX.Element {
    const { ref, inView } = useInView();
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 300);
    const [technology, setTechnology] = useState('');

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch } = useInfiniteQuery({
        queryKey: ['snippets', debouncedSearch, technology],
        queryFn: async ({ pageParam = 1 }) => {
            const snippets = await getSnippets(pageParam, 6, debouncedSearch, technology);
            return snippets;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 6 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);

    useEffect(() => {
        refetch();
    }, [debouncedSearch, technology, refetch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Snippets library</h1>
            <SnippetFilter setSearch={setSearch} search={search} technology={technology} setTechnology={setTechnology} />
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
                                {[...Array(6)].map((_, index) => (
                                    <SnippetCardSkeleton key={index} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}