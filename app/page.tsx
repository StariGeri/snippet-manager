import { SignedIn, UserButton } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
