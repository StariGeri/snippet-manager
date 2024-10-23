import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {

    return (
        <div className="inset-0 flex min-h-[80dvh] w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
                <SignIn />
            </div>
        </div>
    );
}