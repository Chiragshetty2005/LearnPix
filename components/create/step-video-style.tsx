"use client";

import { useState } from "react";
import { VideoStyles } from "./constants";
import { WizardFooter } from "./wizard-footer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function StepVideoStyle({
    initialData,
    onComplete,
    onBack
}: {
    initialData?: any;
    onComplete: (data: any) => void;
    onBack: () => void;
}) {
    const [selectedStyle, setSelectedStyle] = useState<string>(initialData?.videoStyle || VideoStyles[0].name);

    const handleContinue = () => {
        onComplete({
            videoStyle: selectedStyle
        });
    };

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Video Style</h2>
            <p className="text-zinc-500 mb-8">Choose the visual style for your video generation.</p>

            <div className="flex-1 w-full overflow-hidden">
                <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
                    <div className="flex w-max space-x-6 p-4">
                        {VideoStyles.map((style) => (
                            <div
                                key={style.name}
                                className="relative group cursor-pointer"
                                onClick={() => setSelectedStyle(style.name)}
                            >
                                <Card
                                    className={`
                        w-[200px] h-[350px] overflow-hidden rounded-xl border-2 transition-all duration-300 relative
                        ${selectedStyle === style.name
                                            ? 'border-blue-600 ring-4 ring-blue-100 scale-105 shadow-xl'
                                            : 'border-zinc-200 hover:border-zinc-300 hover:scale-105 hover:shadow-lg'}
                    `}
                                >
                                    <Image
                                        src={style.image}
                                        alt={style.name}
                                        fill
                                        className="object-cover"
                                    />

                                    {selectedStyle === style.name && (
                                        <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center">
                                            <CheckCircle2 className="w-12 h-12 text-white drop-shadow-md animate-in zoom-in" />
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                                        <h3 className="text-white font-bold text-center text-lg">{style.name}</h3>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            <WizardFooter
                onBack={onBack}
                onNext={handleContinue}
                isNextDisabled={!selectedStyle}
            />
        </div>
    );
}
