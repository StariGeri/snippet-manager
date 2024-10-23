"use client"

import * as React from "react"
import { Terminal } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function Logo() {

  return (
    <SidebarMenu className="pb-2">
      <SidebarMenuItem>
        <div className="flex items-center w-fit px-1.5 gap-x-2">
          <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Terminal className="size-3" />
          </div>
          <span className="truncate font-semibold text-base">Snipz</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
