"use client";

import { useState, useRef } from "react";
import { Languages, getAllVoices } from "./constants";
import { WizardFooter } from "./wizard-footer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Play, Pause, Mic } from "lucide-react";

export function StepLanguage({
    initialData,
    onComplete,
    onBack
}: {
    initialData?: any;
    onComplete: (data: any) => void;
    onBack: () => void;
}) {
    const [selectedLanguage, setSelectedLanguage] = useState<string>(initialData?.language || "English");
    const [selectedVoice, setSelectedVoice] = useState<string | null>(initialData?.voice || null);
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);

    // Audio ref to handle playback
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Derive current model from language
    const currentLanguageData = Languages.find(l => l.language === selectedLanguage);
    const currentVoices = currentLanguageData ? getAllVoices(currentLanguageData.modelName) : [];

    const handlePlayPreview = (e: React.MouseEvent, voice: any) => {
        e.stopPropagation(); // Prevent card selection when clicking play

        if (playingVoice === voice.modelName) {
            audioRef.current?.pause();
            setPlayingVoice(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            // Assuming preview files are in public/voices/ or similar. 
            // User didn't specify path, just filenames. 
            // We'll use a placeholder path or just the filename if it's external.
            // For now, let's assume they are relative or full URLs. 
            // NOTE: User gave filenames, so we probably need a base URL.
            // I'll make it generic for now.
            // I'll make it generic for now.
            const audioUrl = `/voice/${voice.preview}`;

            const audio = new Audio(audioUrl);
            audioRef.current = audio;
            audio.play().catch(err => console.error("Audio playback failed", err));

            setPlayingVoice(voice.modelName);

            audio.onended = () => {
                setPlayingVoice(null);
            };
        }
    };

    const handleContinue = () => {
        onComplete({
            language: selectedLanguage,
            voice: selectedVoice,
            languageData: currentLanguageData
        });
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Language & Voice</h2>
            <p className="text-zinc-500 mb-8">Choose the language for your video and a narrator voice.</p>

            <div className="space-y-8 flex-1">
                {/* Language Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-700">Select Language</label>
                    <Select value={selectedLanguage} onValueChange={(val) => {
                        setSelectedLanguage(val);
                        setSelectedVoice(null); // Reset voice on language change
                    }}>
                        <SelectTrigger className="w-full md:w-[300px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {Languages.map((lang) => (
                                <SelectItem key={lang.language} value={lang.language}>
                                    <span className="mr-2">{lang.countryFlag}</span>
                                    {lang.language}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Voice Selection */}
                <div className="space-y-3 flex-1 flex flex-col">
                    <label className="text-sm font-medium text-zinc-700">Select Voice Model ({currentVoices.length})</label>

                    <ScrollArea className="h-[400px] rounded-md border border-zinc-200 p-4 bg-zinc-50/50">
                        {currentVoices.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentVoices.map((voice) => (
                                    <Card
                                        key={voice.modelName}
                                        className={`p-4 cursor-pointer hover:border-blue-500 border-2 transition-all relative overflow-hidden group ${selectedVoice === voice.modelName ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-white'}`}
                                        onClick={() => setSelectedVoice(voice.modelName)}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className={`p-2 rounded-full ${selectedVoice === voice.modelName ? 'bg-blue-100 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>
                                                <Mic className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">{voice.model}</span>
                                                <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-1.5 py-0.5 rounded">{voice.gender}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-zinc-900 text-sm mb-1 truncate" title={voice.modelName}>{voice.modelName}</h3>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between">
                                            {/* Play Button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 rounded-full p-0 hover:bg-zinc-100"
                                                onClick={(e) => handlePlayPreview(e, voice)}
                                            >
                                                {playingVoice === voice.modelName ? (
                                                    <Pause className="w-3 h-3 text-blue-600" />
                                                ) : (
                                                    <Play className="w-3 h-3 text-zinc-600" />
                                                )}
                                            </Button>

                                            {selectedVoice === voice.modelName && (
                                                <span className="text-xs font-semibold text-blue-600 animate-in fade-in zoom-in">Selected</span>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                                <p>No voices available for this language yet.</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>

            <WizardFooter
                onBack={onBack}
                onNext={handleContinue}
                isNextDisabled={!selectedVoice}
            />
        </div>
    );
}
