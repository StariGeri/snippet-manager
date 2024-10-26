'use client'

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { Combobox } from "@/components/shared/Combobox"
import { snippetSchema } from "@/types/formSchemas"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEditSnippet } from "@/hooks/useEditSnippet"
import { Snippet } from "@/types/snippet"

export default function EditSnippetPage({ snippet }: { snippet: Snippet }) {
    const { folders, onSubmit } = useEditSnippet(snippet.id);

    const { register, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof snippetSchema>>({
        resolver: zodResolver(snippetSchema),
        defaultValues: {
            title: snippet.title,
            description: snippet.description || "",
            language: snippet.language,
            code: snippet.code,
            folderId: snippet.folderId || undefined,
            tags: snippet.tags.map(tag => tag.name),
        },
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Edit Snippet</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" {...register("title")} />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label htmlFor="folderId">Folder</Label>
                    <Controller
                        name="folderId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value || undefined}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a folder (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {folders.map((folder) => (
                                        <SelectItem key={folder.id} value={folder.id}>
                                            {folder.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea id="description" {...register("description")} />
                    <p className="text-sm text-muted-foreground">
                        Description must be less than 255 characters
                    </p>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div className="flex flex-col gap-y-1.5">
                    <Label htmlFor="language">Technology</Label>
                    <Controller
                        name="language"
                        control={control}
                        render={({ field }) => (
                            <Combobox
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select a technology"
                            />
                        )}
                    />
                    {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language.message}</p>}
                </div>

                <div>
                    <Label htmlFor="code" className="text-sm">Code</Label>
                    <Card className="p-2 mt-1">
                        <Controller
                            name="code"
                            control={control}
                            render={({ field }) => (
                                <CodeMirror
                                    value={field.value}
                                    height="300px"
                                    extensions={[javascript()]}
                                    style={{ fontSize: 14, backgroundColor: 'blue' }}
                                    onChange={(value) => field.onChange(value)}
                                    theme="dark"
                                />
                            )}
                        />
                    </Card>
                    {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="tags">Tags</Label>
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <div className="flex flex-wrap gap-2">
                                {field.value.map((tag, index) => (
                                    <div key={index} className="flex items-center bg-primary text-primary-foreground rounded px-2 py-1">
                                        <span key={index}>{tag}</span>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const newTags = field.value.filter((_, i) => i !== index)
                                                field.onChange(newTags)
                                            }}
                                            className="ml-2 text-sm"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                                {field.value.length < 3 && (
                                    <Input
                                        placeholder="Start typing to add a tag.."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                const input = e.currentTarget
                                                const newTag = input.value.trim()
                                                if (newTag && !field.value.includes(newTag)) {
                                                    field.onChange([...field.value, newTag])
                                                    input.value = ''
                                                }
                                            }
                                        }}
                                        className="w-48"
                                    />
                                )}
                            </div>
                        )}
                    />
                    <p className="text-sm text-muted-foreground">
                        Max 3 tags can be added
                    </p>
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
                </div>

                <Button type="submit">Update Snippet</Button>
            </form>
        </div>
    )
}