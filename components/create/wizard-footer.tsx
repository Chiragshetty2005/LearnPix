import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WizardFooterProps {
    onBack?: () => void;
    onNext: () => void;
    isNextDisabled?: boolean;
    nextLabel?: string;
    backLabel?: string;
}

export function WizardFooter({
    onBack,
    onNext,
    isNextDisabled = false,
    nextLabel = "Continue",
    backLabel = "Back"
}: WizardFooterProps) {
    return (
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-zinc-100">
            <div>
                {onBack && (
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-zinc-500 hover:text-zinc-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {backLabel}
                    </Button>
                )}
            </div>

            <Button
                size="lg"
                className="px-8 bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                disabled={isNextDisabled}
                onClick={onNext}
            >
                {nextLabel || "Continue"}
                <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
}
