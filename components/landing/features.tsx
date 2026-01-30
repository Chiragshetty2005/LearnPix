import { Wand2, Calendar, Share2, Youtube, Instagram, Mail } from "lucide-react";
// If you don't have a tiktok icon in lucide-react (it was added recently), use a custom SVG or placeholder.
// Assuming lucide-react has it or we can use a generic video icon.

const features = [
    {
        icon: Wand2,
        title: "AI Video Generator",
        description: "Turn text into engaging short videos instantly using advanced AI models.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
    },
    {
        icon: Calendar,
        title: "Smart Scheduler",
        description: "Auto-schedule your content for peak engagement times across all platforms.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
    },
    {
        icon: Share2,
        title: "Multi-Platform",
        description: "Publish seamlessly to Instagram, TikTok, YouTube Shorts, and Email newsletters.",
        color: "text-pink-400",
        bg: "bg-pink-500/10",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-black relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent mb-4">
                        Everything You Need to Go Viral
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Stop spending hours editing. Let AI handle the heavy lifting while you focus on creativity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-zinc-400">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <h3 className="text-xl font-medium text-white mb-8">Supported Platforms</h3>
                    <div className="flex justify-center gap-8 text-zinc-500">
                        <span className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                            <Instagram className="w-6 h-6" /> Instagram
                        </span>
                        <span className="flex items-center gap-2 hover:text-black hover:bg-white hover:rounded transition-colors">
                            {/* Lucide might not have TikTok, using a text fallback if needed or a generic video icon */}
                            <span className="font-bold">TikTok</span>
                        </span>
                        <span className="flex items-center gap-2 hover:text-red-600 transition-colors">
                            <Youtube className="w-6 h-6" /> YouTube
                        </span>
                        <span className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                            <Mail className="w-6 h-6" /> Email
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
