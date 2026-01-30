"use client";

import { useState } from "react";
import { ProgressStepper } from "./progress-stepper";
import { StepNiche } from "./step-niche";

import { StepLanguage } from "./step-language";
import { StepMusic } from "./step-music";
import { StepVideoStyle } from "./step-video-style";
import { StepCaptionStyle } from "./step-caption-style";
import { StepStory } from "./step-story";

interface CreateWizardProps {
    initialData?: any;
    seriesId?: string;
    isEditMode?: boolean;
}

export function CreateWizard({ initialData = {}, seriesId, isEditMode = false }: CreateWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialData);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async (stepData: any) => {
        // 1. Calculate new data immediately
        const updatedData = { ...formData, ...stepData };

        // 2. Update state
        setFormData(updatedData);
        console.log("Updated Wizard Data:", updatedData);

        // 3. If last step, submit
        if (currentStep === 6) {
            if (isSubmitting) return; // Prevent double submission
            setIsSubmitting(true);

            console.log("Submitting FINAL DATA:", updatedData);

            try {
                const url = '/api/video-series';
                const method = isEditMode ? 'PUT' : 'POST';
                const bodyData = isEditMode ? { ...updatedData, id: seriesId } : updatedData;

                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyData)
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(errorText || 'Failed to save series');
                }

                // Redirect to dashboard on success
                window.location.href = '/dashboard';
            } catch (err: any) {
                console.error("Submission failed:", err);
                alert(`Failed to save series: ${err.message}`);
                setIsSubmitting(false); // Re-enable on error
            }
            return;
        }

        // 4. Otherwise, next step
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-zinc-900">{isEditMode ? "Edit Series" : "Create New Series"}</h1>
            </div>

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
