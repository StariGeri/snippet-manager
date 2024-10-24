import { AppSidebar } from "@/components/layout/app-sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="grid min-h-screen w-full md:grid-cols-[255px_1fr]">
            <AppSidebar />
            <div className="p-2">{children}</div>
        </main>
    );
};

export default AppLayout;