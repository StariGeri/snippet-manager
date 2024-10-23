import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {

    return (
        <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
            <SignUp />
        </div>
    );
}