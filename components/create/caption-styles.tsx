import { cn } from "@/lib/utils";

export const CaptionStyles = [
    {
        id: "hormozi",
        name: "Hormozi",
        description: "Bold, punchy, yellow & black. High energy.",
        className: "font-black text-yellow-400 uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-3xl",
        containerClassName: "bg-transparent",
    },
    {
        id: "cinematic",
        name: "Cinematic",
        description: "Elegant, wide spacing, fade-in.",
        className: "font-serif text-white tracking-[0.2em] font-light text-xl",
        containerClassName: "bg-black/80 px-4 py-2 rounded-sm",
    },
    {
        id: "neon",
        name: "Neon Glow",
        description: "Cyberpunk visuals with glowing text.",
        className: "font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] text-2xl",
        containerClassName: "bg-black/90 px-4 py-2 rounded-lg border border-purple-500/30",
    },
    {
        id: "comic",
        name: "Comic Book",
        description: "Fun, bouncy, colorful.",
        className: "font-extrabold text-white text-2xl drop-shadow-[2px_2px_0_#000]",
        containerClassName: "bg-orange-500 px-3 py-1 -rotate-2 border-2 border-black shadow-[4px_4px_0_#000]",
    },
    {
        id: "minimal",
        name: "Clean Minimal",
        description: "Modern, simple, distraction-free.",
        className: "font-medium text-zinc-800 text-lg",
        containerClassName: "bg-white/90 px-4 py-2 rounded-full shadow-sm backdrop-blur",
    },
    {
        id: "typewriter",
        name: "Typewriter",
        description: "Retro terminal style.",
        className: "font-mono text-green-400 text-lg border-r-2 border-green-400 pr-1 animate-pulse",
        containerClassName: "bg-zinc-900 px-4 py-2 rounded",
    },
];

export const CaptionPreview = ({ style, isActive }: { style: typeof CaptionStyles[0], isActive: boolean }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-zinc-100/50 rounded-lg overflow-hidden relative">
            {/* Background placeholder pattern to show transparency */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
            </div>

            <div className={cn("transition-all duration-300 transform", isActive ? "scale-110" : "scale-100")}>
                <div className={cn("transition-all duration-300", style.containerClassName)}>
                    <span className={cn("transition-all duration-300", style.className)}>
                        {style.id === 'typewriter' ? "Hello_World" : "Cool Caption"}
                    </span>
                </div>
            </div>
        </div>
    );
}
