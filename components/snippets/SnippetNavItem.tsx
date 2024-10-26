'use client';

import { SelectSnippet } from "@/lib/db/schema";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Code } from "lucide-react";
import Link from "next/link";

const SnippetItem = ({ snippet }: { snippet: SelectSnippet }) => (
    <SidebarMenuItem>
        <Link href={`/snippets/${snippet.id}`} passHref legacyBehavior>
            <SidebarMenuButton className="w-full">
                <Code className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">{snippet.title}</span>
            </SidebarMenuButton>
        </Link>
    </SidebarMenuItem>
)

export default SnippetItem;