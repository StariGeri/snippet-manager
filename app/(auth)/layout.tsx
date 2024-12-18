const AuthLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <main className="inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            {children}
        </main>
    );
};

export default AuthLayout;