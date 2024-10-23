"use client"

import * as React from "react"
import { ChevronRight, Folder, File } from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { Logo } from "@/components/layout/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import Link from "next/link"
import { initialFolders, navItems } from "@/constants"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar className="border-r-0" {...props}>
        <SidebarHeader>
          <Logo />
          <NavMain items={navItems} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Snippets</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {initialFolders.map((folder) => (
                  <SidebarMenuItem key={folder.id}>
                    <Collapsible
                      className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                      defaultOpen={false}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <ChevronRight className="mr-2 h-4 w-4 shrink-0 transition-transform" />
                          <Folder className="mr-2 h-4 w-4 shrink-0" />
                          {folder.name}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {folder.snippets.map((snippet) => (
                            <SidebarMenuItem key={snippet.id}>
                              <Link href={`/snippets/${snippet.id}`} passHref legacyBehavior>
                                <SidebarMenuButton>
                                  <File className="mr-2 h-4 w-4 shrink-0" />
                                  {snippet.name}
                                </SidebarMenuButton>
                              </Link>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
