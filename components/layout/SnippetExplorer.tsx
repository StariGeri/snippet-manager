import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "../ui/sidebar";
import { initialFolders } from "@/constants";
import { ChevronRight, Code, Folder } from "lucide-react";

const SnippetExplorer = () => {


    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-primary">Snippets</SidebarGroupLabel>
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
                                                        <Code className="mr-2 h-4 w-4 shrink-0" />
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
    );
};

export default SnippetExplorer;