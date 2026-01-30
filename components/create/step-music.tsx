"use client";

import { useState, useRef } from "react";
import { BackgroundMusic } from "./constants";
import { WizardFooter } from "./wizard-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, Music, CheckCircle2, Circle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function StepMusic({
    initialData,
    onComplete,
    onBack
}: {
    initialData?: any;
    onComplete: (data: any) => void;
    onBack: () => void;
}) {
    // Store selected music URLs
    const [selectedMusic, setSelectedMusic] = useState<string[]>(initialData?.music || []);
    const [playingTrack, setPlayingTrack] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleSelection = (url: string) => {
        setSelectedMusic(prev => {
            if (prev.includes(url)) {
                return prev.filter(item => item !== url);
            } else {
                return [...prev, url];
            }
        });
    };

    const handlePlayPreview = (e: React.MouseEvent, trackUrl: string) => {
        e.stopPropagation();

        if (playingTrack === trackUrl) {
            audioRef.current?.pause();
            setPlayingTrack(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }

            const audio = new Audio(trackUrl);
            audioRef.current = audio;
            audio.play().catch(err => console.error("Audio playback failed", err));

            setPlayingTrack(trackUrl);

            audio.onended = () => {
                setPlayingTrack(null);
            };
        }
    };

    const handleContinue = () => {
        onComplete({
            music: selectedMusic
        });
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Background Music</h2>
            <p className="text-zinc-500 mb-8">Select one or more background tracks for your video series.</p>

            <div className="flex-1">
                <ScrollArea className="h-[400px] rounded-md border border-zinc-200 p-2 bg-zinc-50/50">
                    <div className="flex flex-col gap-2 p-2">
                        {BackgroundMusic.map((track) => {
                            const isSelected = selectedMusic.includes(track.url);
                            const isPlaying = playingTrack === track.url;

                            return (
                                <div
                                    key={track.url}
                                    className={`
                    group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
                    ${isSelected
                                            ? 'bg-blue-50 border-blue-200 shadow-sm'
                                            : 'bg-white border-zinc-200 hover:border-blue-300 hover:bg-white'}
                  `}
                                    onClick={() => toggleSelection(track.url)}
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`
                        h-10 w-10 rounded-full shrink-0
                        ${isPlaying ? 'bg-blue-100 text-blue-600' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}
                      `}
                                            onClick={(e) => handlePlayPreview(e, track.url)}
                                        >
                                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                        </Button>

                                        <div className="flex flex-col">
                                            <h3 className={`font-medium text-sm ${isSelected ? 'text-blue-900' : 'text-zinc-900'}`}>
                                                {track.name}
                                            </h3>
                                            <p className="text-xs text-zinc-500 flex items-center gap-1">
                                                <Music className="w-3 h-3" /> Background Track
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pl-4">
                                        {isSelected ? (
                                            <CheckCircle2 className="w-6 h-6 text-blue-600 animate-in zoom-in duration-200" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-zinc-200 group-hover:text-blue-400 transition-colors" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

                <div className="mt-4 flex justify-between items-center px-2">
                    <p className="text-sm text-zinc-500">
                        {selectedMusic.length} track{selectedMusic.length !== 1 ? 's' : ''} selected
                    </p>
                </div>
            </div>

            <WizardFooter
                onBack={onBack}
                onNext={handleContinue}
                isNextDisabled={selectedMusic.length === 0}
            />
        </div>
    );
}
