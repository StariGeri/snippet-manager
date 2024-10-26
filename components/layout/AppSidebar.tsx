"use client"

import * as React from "react"

import { NavMain } from "@/components/layout/NavMain"
import Logo from "@/components/layout/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { navItems } from "@/constants"
import UserProfile from "@/components/layout/UserProfile"
import SnippetExplorer from "@/components/layout/SnippetExplorer"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <SidebarProvider>
      <Sidebar className="border-r-1" {...props}>
        <SidebarHeader>
          <Logo />
          <NavMain items={navItems} />
        </SidebarHeader>
        <SidebarContent>
          <SnippetExplorer />
        </SidebarContent>
        <SidebarFooter>
          <UserProfile />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
