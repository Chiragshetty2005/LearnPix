"use client";

import { useState } from "react";
import { WizardFooter } from "./wizard-footer";
import { VideoDurations, Platforms } from "./constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

export function StepStory({
    initialData,
    onComplete,
    onBack
}: {
    initialData?: any;
    onComplete: (data: any) => void;
    onBack: () => void;
}) {
    const [seriesName, setSeriesName] = useState(initialData?.seriesName || "");
    const [duration, setDuration] = useState(initialData?.duration || "");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(initialData?.platforms || []);
    const [publishTime, setPublishTime] = useState(initialData?.publishTime || "");

    const togglePlatform = (platformName: string) => {
        setSelectedPlatforms(prev => {
            if (prev.includes(platformName)) {
                return prev.filter(p => p !== platformName);
            } else {
                return [...prev, platformName];
            }
        });
    };

    const handleSubmit = () => {
        onComplete({
            seriesName,
            duration,
            platforms: selectedPlatforms,
            publishTime
        });
    };

    const isFormValid = seriesName && duration && selectedPlatforms.length > 0 && publishTime;

    return (
        <div className="flex flex-col h-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Series Details</h2>
            <p className="text-zinc-500 mb-8">Finalize your video series details and schedule publication.</p>

            <div className="space-y-6 flex-1">
                {/* Series Name */}
                <div className="space-y-2">
                    <Label htmlFor="seriesName">Series Name</Label>
                    <Input
                        id="seriesName"
                        placeholder="e.g., The Magic Forest Adventure"
                        value={seriesName}
                        onChange={(e) => setSeriesName(e.target.value)}
                        className="bg-zinc-50 border-zinc-200"
                    />
                </div>

                {/* Video Duration */}
                <div className="space-y-2">
                    <Label>Video Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                        <SelectTrigger className="bg-zinc-50 border-zinc-200">
                            <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            {VideoDurations.map((d) => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Platform Selection (Multi-select) */}
                <div className="space-y-2">
                    <Label>Select Platforms</Label>
                    <div className="grid grid-cols-2 gap-3">
                        {Platforms.map((p) => {
                            const isSelected = selectedPlatforms.includes(p.name);
                            return (
                                <div
                                    key={p.name}
                                    onClick={() => togglePlatform(p.name)}
                                    className={`
                                        flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                                        ${isSelected
                                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
                                            : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:border-zinc-300'}
                                    `}
                                >
                                    <p.icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-zinc-400'}`} />
                                    <span className="font-medium text-sm">{p.name}</span>
                                </div>
                            );
                        })}
                    </div>
                    {selectedPlatforms.length === 0 && (
                        <p className="text-xs text-red-400 mt-1">Please select at least one platform.</p>
                    )}
                </div>

                {/* Publish Time */}
                <div className="space-y-2">
                    <Label>Publish Time</Label>
                    <div className="relative">
                        <Input
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                            className="bg-zinc-50 border-zinc-200 pl-10"
                        />
                        <Clock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-xs text-amber-600 mt-2 bg-amber-50 p-2 rounded border border-amber-100 flex items-center gap-2">
                        <CalendarIcon className="w-3 h-3" />
                        Note: Video will generate 3-6 hours before video publish time.
                    </p>
                </div>
            </div>

            <WizardFooter
                onBack={onBack}
                onNext={handleSubmit}
                isNextDisabled={!isFormValid}
                nextLabel="Schedule"
            />
        </div>
    );
}
