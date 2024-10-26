'use client';

import { Trash } from "lucide-react"
import { deleteFolder } from "@/server/folder-actions"
import { SelectFolder } from "@/lib/db/schema"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"

const DeleteFolderDialog = ({ folder, onFolderDeleted }: { folder: SelectFolder, onFolderDeleted: () => void }) => {
    const [open, setOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

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

export default DeleteFolderDialog;