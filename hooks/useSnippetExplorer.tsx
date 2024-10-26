import { SelectFolder, SelectSnippet } from "@/lib/db/schema";
import { getFoldersAndSnippets } from "@/server/folder-actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


interface FoldersAndSnippets {
    folders: SelectFolder[]
    snippets: SelectSnippet[]
}

/**
 * Custom hook to store the states and functions needed for the SnippetExplorer component
 * @returns {Object} Containing all the states and functions needed for the SnippetExplorer component
 */
export const useSnippetExplorer = () => {

    const queryClient = useQueryClient()

    const [openFolderId, setOpenFolderId] = useState<string | null>(null)

    // Handling the folder opening and closing when clicked
    const handleFolderClick = (folderId: string) => {
        setOpenFolderId(prevId => prevId === folderId ? null : folderId)
    }

    // refetching the SnippetExplorer data when a folder is created
    const handleFolderCreated = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    // refetching the SnippetExplorer data when a folder is renamed
    const handleFolderRenamed = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    // refetching the SnippetExplorer data when a folder is deleted
    const handleFolderDeleted = () => {
        queryClient.invalidateQueries({ queryKey: ['foldersAndSnippets'] })
    }

    return {
        openFolderId,
        handleFolderClick,
        handleFolderCreated,
        handleFolderRenamed,
        handleFolderDeleted
    };
};