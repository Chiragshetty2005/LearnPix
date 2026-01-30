import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/30">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    Vidmaxx
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <div className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
                                Sign In
                            </div>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-6">
                                Get Started
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white mr-2" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
