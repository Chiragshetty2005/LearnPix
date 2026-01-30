"use client";

import { useEffect, useState } from "react";
import { SeriesCard } from "@/components/dashboard/series-card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner"; // Assuming sonner is installed or will use basic alert/console

type Series = any; // You can define a stricter type if needed

export function SeriesList() {
    const [series, setSeries] = useState<Series[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSeries = async () => {
        try {
            const response = await fetch("/api/video-series");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch series: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            setSeries(data);
        } catch (error: any) {
            console.error("Error fetching series:", error);
            alert(error.message); // Show error to user
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSeries();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (series.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-zinc-200 border-dashed">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900">No Series Created Yet</h3>
                <p className="text-zinc-500 mb-6">Create your first AI video series to get started.</p>
                <Button asChild>
                    <Link href="/dashboard/create">Create New Series</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {series.map((item) => (
                <SeriesCard key={item.id} series={item} />
            ))}
        </div>
    );
}
