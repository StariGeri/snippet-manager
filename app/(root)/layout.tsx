import { AppSidebar } from "@/components/layout/app-sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex h-screen">
            <AppSidebar />
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
    );
};

export default AppLayout;