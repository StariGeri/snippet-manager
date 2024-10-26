'use client'

import * as React from "react"
import { Folder } from "lucide-react"
import { createFolder } from "@/server/folder-actions"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { folderSchema } from "@/types/formSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

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

export default CreateFolderDialog;