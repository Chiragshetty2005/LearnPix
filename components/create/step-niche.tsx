import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { WizardFooter } from "./wizard-footer";
import {
    BookOpen,
    Zap,
    FlaskConical,
    Moon,
    Landmark,
    Globe,
    Sparkles,
    Rocket,
    Bone,
    Leaf,
    Calculator,
    Brain
} from "lucide-react";

const niches = [
    { title: "Panchatantra Stories", description: "Timeless fables with moral lessons.", icon: BookOpen },
    { title: "Motivational", description: "Inspiring content to uplift.", icon: Zap },
    { title: "Science Facts", description: "Fun and educational science.", icon: FlaskConical },
    { title: "Bedtime Stories", description: "Soothing tales for sleep.", icon: Moon },
    { title: "History", description: "Historical events simplified.", icon: Landmark },
    { title: "Geography", description: "Explore the world wonders.", icon: Globe },
    { title: "Fun Facts", description: "Surprising and fun tidbits.", icon: Sparkles },
    { title: "Space Exploration", description: "Adventures in the cosmos.", icon: Rocket },
    { title: "Dinosaur World", description: "Prehistoric giants.", icon: Bone },
    { title: "Environmental Science", description: "Nature and ecology lessons.", icon: Leaf },
    { title: "Mathematics", description: "Fun with numbers and logic.", icon: Calculator },
    { title: "General Knowledge", description: "Broaden your horizons.", icon: Brain },
];

export function StepNiche({
    initialData,
    onComplete
}: {
    initialData?: any;
    onComplete: (data: any) => void
}) {
    const [selectedTab, setSelectedTab] = useState(initialData?.nicheType || "available");
    const [selectedNiche, setSelectedNiche] = useState<string | null>(initialData?.niche && initialData.nicheType === 'available' ? initialData.niche : null);
    const [customNiche, setCustomNiche] = useState(initialData?.customNiche && initialData.nicheType === 'custom' ? initialData.customNiche : "");

    const handleContinue = () => {
        const data = selectedTab === "available"
            ? { niche: selectedNiche, nicheType: "available" }
            : { niche: "Custom", customNiche: customNiche, nicheType: "custom" };

        onComplete(data);
    };

    const isValid = (selectedTab === "available" && selectedNiche) || (selectedTab === "custom" && customNiche.trim().length > 3);

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-zinc-900">Choose Your Video Niche</h2>
            <p className="text-zinc-500 mb-6">Select a predefined category or describe your own specific topic.</p>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="available">Available Niche</TabsTrigger>
                    <TabsTrigger value="custom">Custom Niche</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="flex-1 mt-0">
                    <ScrollArea className="h-[400px] rounded-md border border-zinc-200 p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {niches.map((niche) => (
                                <Card
                                    key={niche.title}
                                    className={`p-3 cursor-pointer hover:border-blue-500 border-2 transition-all flex flex-col items-center text-center gap-2 ${selectedNiche === niche.title ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-zinc-50'}`}
                                    onClick={() => setSelectedNiche(niche.title)}
                                >
                                    <div className={`p-2 rounded-full ${selectedNiche === niche.title ? 'bg-blue-100 text-blue-600' : 'bg-zinc-100 text-zinc-500'}`}>
                                        <niche.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-zinc-900 leading-tight mb-1">{niche.title}</h3>
                                        <p className="text-xs text-zinc-500 line-clamp-2 leading-snug">{niche.description}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="custom" className="flex-1 mt-0">
                    <Card className="p-6 h-[400px] flex flex-col">
                        <h3 className="font-semibold mb-4 text-zinc-900">Describe Your Topic</h3>
                        <Textarea
                            placeholder="e.g., A video about the life cycle of a butterfly, explained simply for 5-year-olds..."
                            className="flex-1 resize-none text-base p-4"
                            value={customNiche}
                            onChange={(e) => setCustomNiche(e.target.value)}
                        />
                        <p className="text-sm text-zinc-400 mt-2 text-right">{customNiche.length} characters</p>
                    </Card>
                </TabsContent>
            </Tabs>

            <WizardFooter
                onNext={handleContinue}
                isNextDisabled={!isValid}
            />
        </div>
    );
}
