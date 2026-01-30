import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[128px]" />
            </div>

            <div className="container relative z-10 px-4 py-20 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 mb-8 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>New: AI Video Generation for Kids Education</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                    Create Short Video for Kids <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        With the Power of AI
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
                    Vidmaxx helps to generate Conceptual Video. Generate engaging short videos,
                    schedule them instantly for Instagram, TikTok, and YouTube, and empower
                    learning with our dedicated kids' platform.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-base">
                                Start Creating Free
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <Link href="/dashboard">
                            <Button size="lg" className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-base">
                                Go to Dashboard
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </SignedIn>

                    <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-white/20 text-white hover:bg-white/10 text-base bg-transparent">
                        <PlayCircle className="mr-2 w-4 h-4" />
                        Watch Demo
                    </Button>
                </div>
            </div>
        </section>
    );
}
