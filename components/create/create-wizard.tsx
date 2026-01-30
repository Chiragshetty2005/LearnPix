"use client";

import { useState } from "react";
import { ProgressStepper } from "./progress-stepper";
import { StepNiche } from "./step-niche";

import { StepLanguage } from "./step-language";
import { StepMusic } from "./step-music";
import { StepVideoStyle } from "./step-video-style";
import { StepCaptionStyle } from "./step-caption-style";
import { StepStory } from "./step-story";

export function CreateWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (stepData: any) => {
        setFormData(prev => {
            const newData = { ...prev, ...stepData };
            console.log("Updated Wizard Data:", newData);

            // If we are at the last step, we might want to trigger submission here
            if (currentStep === 6) {
                console.log("FINAL SUBMISSION:", newData);
            }

            return newData;
        });

        // Current max steps is 6 (Niche -> Language -> Music -> Style -> Caption -> Story)
        if (currentStep < 6) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <ProgressStepper currentStep={currentStep} />

            <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm min-h-[600px]">
                {currentStep === 1 && (
                    <StepNiche
                        initialData={formData}
                        onComplete={handleNext}
                    />
                )}

                {currentStep === 2 && (
                    <StepLanguage
                        initialData={formData}
                        onComplete={handleNext}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 3 && (
                    <StepMusic
                        initialData={formData}
                        onComplete={handleNext}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 4 && (
                    <StepVideoStyle
                        initialData={formData}
                        onComplete={handleNext}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 5 && (
                    <StepCaptionStyle
                        initialData={formData}
                        onComplete={handleNext}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 6 && (
                    <StepStory
                        initialData={formData}
                        onComplete={handleNext}
                        onBack={handleBack}
                    />
                )}

                {/* Placeholder for future steps */}
                {currentStep > 6 && (
                    <div className="flex flex-col items-center justify-center h-[400px] text-zinc-400">
                        <p>Step {currentStep} coming soon...</p>
                        <p className="text-sm mt-2">Data so far: {JSON.stringify(formData)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
