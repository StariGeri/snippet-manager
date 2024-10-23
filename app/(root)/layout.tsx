import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <AppSidebar />
                <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
        </SidebarProvider>
    );
};

export default AppLayout;