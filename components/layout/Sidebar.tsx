'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Folder, File, ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

// This is a mock data structure. In a real application, you'd fetch this from an API or database.
const initialFolders = [
  {
    id: '1',
    name: 'JavaScript',
    snippets: [
      { id: '1', name: 'Array Methods' },
      { id: '2', name: 'Promise Example' },
    ],
  },
  {
    id: '2',
    name: 'React',
    snippets: [
      { id: '3', name: 'useEffect Hook' },
      { id: '4', name: 'Custom Hook' },
    ],
  },
]

export default function SnippetSidebar() {
  const [folders, setFolders] = useState(initialFolders)
  const [newFolderName, setNewFolderName] = useState('')
  const router = useRouter()

  const handleSnippetClick = (snippetId: string) => {
    router.push(`/snippets/${snippetId}`)
  }

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders([...folders, { id: Date.now().toString(), name: newFolderName, snippets: [] }])
      setNewFolderName('')
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Snippets</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-4 p-4">
            {folders.map((folder) => (
              <Collapsible key={folder.id}>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                  <div className="flex items-center">
                    <Folder className="mr-2 h-4 w-4" />
                    <span>{folder.name}</span>
                  </div>
                  {folder.snippets.length > 0 && (
                    <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {folder.snippets.map((snippet) => (
                      <SidebarMenuSubItem key={snippet.id}>
                        <SidebarMenuSubButton
                          onClick={() => handleSnippetClick(snippet.id)}
                          className="pl-6"
                        >
                          <File className="mr-2 h-4 w-4" />
                          {snippet.name}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
          <div className="p-4">
            <Input
              type="text"
              placeholder="New folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleAddFolder} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Folder
            </Button>
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}