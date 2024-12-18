'use client'

import * as React from "react"
import { useQuery } from '@tanstack/react-query'
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

    const { data, isLoading } = useQuery<FoldersAndSnippets>({
        queryKey: ['foldersAndSnippets'],
        queryFn: getFoldersAndSnippets
    })

    const router = useRouter()

    if (isLoading) return <SkeletonSnippetExplorer />
    if (!data) return null

    const { folders, snippets } = data

    const snippetsInFolders = new Set(snippets.filter(s => s.folderId).map(s => s.id))
    const unassignedSnippets = snippets.filter(s => !snippetsInFolders.has(s.id))

    return (
        <SidebarGroup>
            <div className="flex items-center justify-between">
                <SidebarGroupLabel className="text-primary flex justify-between items-center">
                    Snippets
                </SidebarGroupLabel>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Plus className="h-4 w-4 text-black" />
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
            </div>
            <SidebarGroupContent>
                <SidebarMenu>
                    {folders.map((folder: SelectFolder) => (
                        <SidebarMenuItem key={folder.id}>
                            <Collapsible
                                open={openFolderId === folder.id}
                                onOpenChange={() => handleFolderClick(folder.id)}
                                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                            >
                                <div className="flex items-center">
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="flex-grow">
                                            <ChevronRight className="mr-2 h-4 w-4 shrink-0 transition-transform" />
                                            <Folder className="mr-2 h-4 w-4 shrink-0" />
                                            <span className="truncate font-semibold">{folder.name}</span>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="ml-auto">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">More options</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <RenameFolderDialog folder={folder} onFolderRenamed={handleFolderRenamed} />
                                            <DeleteFolderDialog folder={folder} onFolderDeleted={handleFolderDeleted} />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
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
                                        <span className="truncate font-semibold">Uncategorized</span>
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