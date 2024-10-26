'use client'

import * as React from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"
import { ChevronRight, Code, Folder, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { createFolder, deleteFolder, getFoldersAndSnippets, renameFolder } from "@/server/folder-actions"
import { SelectFolder, SelectSnippet } from "@/lib/db/schema"
import { SkeletonSnippetExplorer } from "@/components/skeletons/SnippetExplorerSkeleton"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { folderSchema } from "@/types/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

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

const CreateFolderDialog = ({ onFolderCreated }: { onFolderCreated: () => void }) => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof folderSchema>>({
        resolver: zodResolver(folderSchema),
    })

    const onSubmit = async (data: z.infer<typeof folderSchema>) => {
        setIsSubmitting(true)
        try {
            const result = await createFolder(data.name)
            if (result.success) {
                toast({
                    title: "✅Folder created",
                    description: `Folder "${data.name}" has been created successfully.`,
                })
                onFolderCreated()
                reset()
                setOpen(false)
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An error occurred while creating the folder.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Folder className="h-4 w-4 mr-1" />
                    Create Folder
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Folder className="h-4 w-4 mr-2" />
                            Create Folder
                        </DialogTitle>
                        <DialogDescription>
                            Enter a name for your new folder. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                disabled={isSubmitting}
                                {...register("name")}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const RenameFolderDialog = ({ folder, onFolderRenamed }: { folder: SelectFolder, onFolderRenamed: () => void }) => {
    const [open, setOpen] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof folderSchema>>({
        resolver: zodResolver(folderSchema),
        defaultValues: { name: folder.name }
    })

    const onSubmit = async (data: z.infer<typeof folderSchema>) => {
        setIsSubmitting(true)
        try {
            const result = await renameFolder(folder.id, data.name)
            if (result.success) {
                toast({
                    title: "✅Folder renamed",
                    description: `Folder has been renamed to "${data.name}" successfully.`,
                })
                onFolderRenamed()
                setOpen(false)
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An error occurred while renaming the folder.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Rename Folder</DialogTitle>
                        <DialogDescription>
                            Enter a new name for the folder. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                {...register("name")}
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Renaming..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const DeleteFolderDialog = ({ folder, onFolderDeleted }: { folder: SelectFolder, onFolderDeleted: () => void }) => {
    const [open, setOpen] = React.useState(false)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteFolder(folder.id)
            if (result.success) {
                toast({
                    title: "✅Folder deleted",
                    description: `Folder "${folder.name}" has been deleted successfully.`,
                })
                onFolderDeleted()
                setOpen(false)
            } else {
                toast({
                    title: "Error",
                    description: result.error || "An error occurred while deleting the folder.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the
                        folder "{folder.name}" and all its contents.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

const SnippetExplorer = () => {

    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery<FoldersAndSnippets>({
        queryKey: ['foldersAndSnippets'],
        queryFn: getFoldersAndSnippets
    })

    const [openFolderId, setOpenFolderId] = React.useState<string | null>(null)

    const handleFolderClick = (folderId: string) => {
        setOpenFolderId(prevId => prevId === folderId ? null : folderId)
    }

    const handleFolderCreated = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    const handleFolderRenamed = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    const handleFolderDeleted = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    if (isLoading) return <SkeletonSnippetExplorer />

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
                    <DropdownMenuContent align="end">
                        <CreateFolderDialog onFolderCreated={handleFolderCreated} />
                        <DropdownMenuItem>
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