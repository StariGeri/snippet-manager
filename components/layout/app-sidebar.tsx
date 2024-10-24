"use client"

import * as React from "react"

import { NavMain } from "@/components/layout/nav-main"
import { Logo } from "@/components/layout/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { navItems } from "@/constants"
import UserProfile from "./UserProfile"
import SnippetExplorer from "./SnippetExplorer"

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
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
