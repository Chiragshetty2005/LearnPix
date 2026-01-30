import { Button } from "@/components/ui/button";
import { Sparkles, Gamepad2, BrainCircuit } from "lucide-react";

export function KidsAppSpotlight() {
    return (
        <section id="kids-app" className="py-24 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
            {/* Playful background elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-200 mb-6">
                            <Gamepad2 className="w-4 h-4" />
                            <span>Fun Learning Experience</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Learn Concepts & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                                Enjoy the Process
                            </span>
                        </h2>
                        <p className="text-lg text-indigo-200 mb-8 max-w-xl">
                            Our dedicated social web app for kids turns learning into an adventure.
                            Safe, educational, and powered by AI to explain complex topics in fun, bite-sized videos.
                        </p>

                        <div className="flex gap-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <BrainCircuit className="w-6 h-6 text-indigo-300" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Smart Explanations</h4>
                                    <p className="text-indigo-200 text-sm">AI adapts to your child's age.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-pink-500/20 rounded-lg">
                                    <Sparkles className="w-6 h-6 text-pink-300" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Safe Environment</h4>
                                    <p className="text-indigo-200 text-sm">Curated and moderated content.</p>
                                </div>
                            </div>
                        </div>

                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold h-12 px-8 rounded-full">
                            Explore Kids Mode
                        </Button>
                    </div>

                    <div className="flex-1 w-full max-w-lg">
                        {/* Mockup of a fun, colorful card or interface */}
                        <div className="aspect-square relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl" />
                            <div className="h-full w-full bg-black/40 rounded-2xl flex items-center justify-center border border-white/5 relative overflow-hidden">
                                <div className="text-center p-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 animate-bounce" />
                                    <h3 className="text-white font-bold text-xl">The Solar System</h3>
                                    <p className="text-indigo-200 text-sm mt-2">Let's travel to Mars today!</p>
                                    <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="w-2/3 h-full bg-green-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
