import { Check } from "lucide-react";

export function ProgressStepper({ currentStep }: { currentStep: number }) {
    const steps = [
        { label: "Niche" },
        { label: "Language" },
        { label: "Music" },
        { label: "Style" },
        { label: "Caption" },
        { label: "Story" },
    ];

    return (
        <div className="w-full mb-8">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 -z-10" />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-300 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((step, index) => {
                    const isCompleted = index + 1 < currentStep;
                    const isCurrent = index + 1 === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center gap-2 bg-zinc-50 px-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : isCurrent
                                        ? "bg-white border-blue-600 text-blue-600"
                                        : "bg-white border-zinc-300 text-zinc-400"
                                    }`}
                            >
                                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                            </div>
                            <span className={`text-xs font-medium ${isCurrent || isCompleted ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
