import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonItem = () => (
    <SidebarMenuItem>
        <SidebarMenuButton className="w-full">
            <Skeleton className="mr-2 h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-24" />
        </SidebarMenuButton>
    </SidebarMenuItem>
)
const SkeletonFolder = () => (
    <SidebarMenuItem>
        <SidebarMenuButton className="w-full">
            <Skeleton className="mr-2 h-4 w-4 shrink-0" />
            <Skeleton className="mr-2 h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-24" />
        </SidebarMenuButton>
    </SidebarMenuItem>
)

export const SkeletonSnippetExplorer = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-primary">Snippets</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SkeletonFolder />
                    <SkeletonFolder />
                    <SkeletonFolder />
                    <SkeletonItem />
                    <SkeletonItem />
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};