import * as React from "react"
import { Pencil } from "lucide-react"
import { renameFolder } from "@/server/folder-actions"
import { SelectFolder } from "@/lib/db/schema"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {  DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { folderSchema } from "@/types/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"


const RenameFolderDialog = ({ folder, onFolderRenamed }: { folder: SelectFolder, onFolderRenamed: () => void }) => {
    const [open, setOpen] = React.useState(false)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof folderSchema>>({
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
            console.error(error);
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
                            Enter a new name for the folder. Click save when you&apos;re done.
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

export default RenameFolderDialog;