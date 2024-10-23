import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snippet Manager",
  description: "A simple snippet manager for devs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn("h-full w-full bg-white antialiased", inter.className)}
        >
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
