'use client'

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"
import { ChevronRight, Code, Folder } from "lucide-react"
import { getFoldersAndSnippets } from "@/server/actions"
import { SelectFolder, SelectSnippet } from "@/lib/db/schema"
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonSnippetExplorer } from "../skeletons/SnippetExplorerSkeleton"

interface FoldersAndSnippets {
    folders: SelectFolder[]
    snippets: SelectSnippet[]
}

const SnippetItem = ({ snippet }: { snippet: SelectSnippet }) => (
    <SidebarMenuItem>
        <Link href={`/snippets/${snippet.id}`} passHref legacyBehavior>
            <SidebarMenuButton className="w-full">
                <Code className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">{snippet.title}</span>
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
)


const SnippetExplorer = () => {
    const { data, isLoading } = useQuery<FoldersAndSnippets>({
        queryKey: ['foldersAndSnippets'],
        queryFn: getFoldersAndSnippets
    })

    const [openFolderId, setOpenFolderId] = React.useState<string | null>(null)

    const handleFolderClick = (folderId: string) => {
        setOpenFolderId(prevId => prevId === folderId ? null : folderId)
    }

    if (isLoading) return <SkeletonSnippetExplorer />

    if (!data) return null

    const { folders, snippets } = data

    const snippetsInFolders = new Set(snippets.filter(s => s.folderId).map(s => s.id))
    const unassignedSnippets = snippets.filter(s => !snippetsInFolders.has(s.id))

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-primary">Snippets</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {folders.map((folder: SelectFolder) => (
                        <SidebarMenuItem key={folder.id}>
                            <Collapsible
                                open={openFolderId === folder.id}
                                onOpenChange={() => handleFolderClick(folder.id)}
                                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                            >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton className="w-full">
                                        <ChevronRight className="mr-2 h-4 w-4 shrink-0 transition-transform" />
                                        <Folder className="mr-2 h-4 w-4 shrink-0" />
                                        <span className="truncate font-semibold">{folder.name}</span>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {snippets.filter((snippet: SelectSnippet) => snippet.folderId === folder.id).map((snippet: SelectSnippet) => (
                                            <SnippetItem key={snippet.id} snippet={snippet} />
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    ))}
                    {unassignedSnippets.length > 0 && (
                        <SidebarMenuItem>
                            <Collapsible
                                open={openFolderId === 'unassigned'}
                                onOpenChange={() => handleFolderClick('unassigned')}
                                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                            >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton className="w-full">
                                        <ChevronRight className="mr-2 h-4 w-4 shrink-0 transition-transform" />
                                        <Folder className="mr-2 h-4 w-4 shrink-0" />
                                        <span className="truncate font-semibold">Other</span>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {unassignedSnippets.map((snippet: SelectSnippet) => (
                                            <SnippetItem key={snippet.id} snippet={snippet} />
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default SnippetExplorer