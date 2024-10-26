import { AppSidebar } from "@/components/layout/AppSidebar";
import Providers from "@/lib/Providers";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <Providers>
            <main className="grid min-h-screen w-full md:grid-cols-[255px_1fr]">
                <AppSidebar />
                <div className="p-2">{children}</div>
            </main>
        </Providers>
    );
};

export default AppLayout;