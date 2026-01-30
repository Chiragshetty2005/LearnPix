"use client";

import { useState } from "react";
import { WizardFooter } from "./wizard-footer";
import { CaptionStyles, CaptionPreview } from "./caption-styles";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepCaptionStyle({
    initialData,
    onComplete,
    onBack
}: {
    initialData?: any;
    onComplete: (data: any) => void;
    onBack: () => void;
}) {
    const [selectedStyle, setSelectedStyle] = useState<string>(initialData?.captionStyle || CaptionStyles[0].id);

    const handleContinue = () => {
        onComplete({
            captionStyle: selectedStyle
        });
    };

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Caption Style</h2>
            <p className="text-zinc-500 mb-8">Choose how the subtitles will look in your video.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {CaptionStyles.map((style) => (
                    <div
                        key={style.id}
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedStyle(style.id)}
                    >
                        <Card
                            className={cn(
                                "h-[180px] overflow-hidden rounded-xl border-2 transition-all duration-300 flex flex-col",
                                selectedStyle === style.id
                                    ? 'border-blue-600 ring-2 ring-blue-100 shadow-lg'
                                    : 'border-zinc-200 hover:border-blue-300 hover:shadow-md'
                            )}
                        >
                            {/* Preview Area */}
                            <div className="flex-1 relative bg-zinc-50">
                                <CaptionPreview style={style} isActive={selectedStyle === style.id} />

                                {selectedStyle === style.id && (
                                    <div className="absolute top-2 right-2 z-10">
                                        <CheckCircle2 className="w-6 h-6 text-blue-600 bg-white rounded-full" />
                                    </div>
                                )}
                            </div>

                            {/* Info Area */}
                            <div className="p-3 bg-white border-t border-zinc-100">
                                <h3 className="font-semibold text-zinc-900 text-sm">{style.name}</h3>
                                <p className="text-xs text-zinc-500 line-clamp-1">{style.description}</p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <WizardFooter
                onBack={onBack}
                onNext={handleContinue}
                isNextDisabled={!selectedStyle}
            />
        </div>
    );
}
