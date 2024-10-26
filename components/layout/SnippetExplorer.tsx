'use client'

import * as React from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"
import { ChevronRight, Code, Folder, MoreHorizontal, Plus } from "lucide-react"
import { getFoldersAndSnippets } from "@/server/folder-actions"
import { SelectFolder, SelectSnippet } from "@/lib/db/schema"
import { SkeletonSnippetExplorer } from "@/components/skeletons/SnippetExplorerSkeleton"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import RenameFolderDialog from "../folders/RenameFolderDialog"
import SnippetItem from "../snippets/SnippetNavItem"
import DeleteFolderDialog from "../folders/DeleteFolderDialog"
import CreateFolderDialog from "../folders/CreateFolderDialog"
import { useSnippetExplorer } from "@/hooks/useSnippetExplorer";
import { useRouter } from 'next/navigation';

interface FoldersAndSnippets {
    folders: SelectFolder[]
    snippets: SelectSnippet[]
}

const SnippetExplorer = () => {

    const { openFolderId, handleFolderClick, handleFolderCreated, handleFolderDeleted, handleFolderRenamed } = useSnippetExplorer();
    
    // Fetching the folders and snippets data
    const { data, isLoading } = useQuery<FoldersAndSnippets>({
        queryKey: ['foldersAndSnippets'],
        queryFn: getFoldersAndSnippets
    })

    const router = useRouter()

    // Show the skeleton loader while the data is being fetched
    if (isLoading) return <SkeletonSnippetExplorer />

    // If there is no data, return null
    if (!data) return null

    const { folders, snippets } = data

    const snippetsInFolders = new Set(snippets.filter(s => s.folderId).map(s => s.id))
    const unassignedSnippets = snippets.filter(s => !snippetsInFolders.has(s.id))

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-primary flex justify-between items-center">
                Snippets
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add folder or snippet</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <CreateFolderDialog onFolderCreated={handleFolderCreated} />
                        <DropdownMenuItem onSelect={() => router.push('/snippets/create')}>
                            <Code className="h-4 w-4 mr-1" />
                            Create Snippet
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarGroupLabel>
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild className="outline-none">
                                                <Button variant="ghost" size="icon" className="ml-auto">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">More options</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <RenameFolderDialog folder={folder} onFolderRenamed={handleFolderRenamed} />
                                                <DeleteFolderDialog folder={folder} onFolderDeleted={handleFolderDeleted} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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