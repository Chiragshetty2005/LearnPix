"use client";

import { VideoStyles } from "@/components/create/constants";
import { Card } from "@/components/ui/card";
import { Edit2, MoreVertical, Play, Pause, Trash2, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteSeries, updateSeriesStatus, generateSeriesVideo } from "@/app/actions/series";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export function SeriesCard({ series }: { series: any }) {
    const [isLoading, setIsLoading] = useState(false);

    // Find style image
    const style = VideoStyles.find(s => s.name === series.video_style);
    const thumbnail = style?.image || "/video-style/realistic.png"; // Fallback

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this series?")) return;
        setIsLoading(true);
        try {
            await deleteSeries(series.id);
        } catch (error) {
            console.error(error);
            alert("Failed to delete");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async () => {
        setIsLoading(true);
        const newStatus = series.status === 'active' ? 'paused' : 'active';
        try {
            await updateSeriesStatus(series.id, newStatus);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            await generateSeriesVideo(series.id);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="overflow-hidden group hover:shadow-md transition-all border-zinc-200">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-zinc-100">
                <Image
                    src={thumbnail}
                    alt={series.series_name}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />

                {/* Status Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/60 text-white text-xs font-medium backdrop-blur-sm capitalize">
                    {series.status}
                </div>

                {/* Edit Icon (Top Right) */}
                <Link href={`/dashboard/edit/${series.id}`}>
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-700 cursor-pointer shadow-sm transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </div>
                </Link>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg text-zinc-900 line-clamp-1" title={series.series_name}>
                            {series.series_name}
                        </h3>
                        <p className="text-xs text-zinc-500">
                            Created {formatDistanceToNow(new Date(series.created_at), { addSuffix: true })}
                        </p>
                    </div>

                    {/* Popover Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-zinc-400 hover:text-zinc-600">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/edit/${series.id}`} className="cursor-pointer flex items-center">
                                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleToggleStatus} className="cursor-pointer">
                                {series.status === 'active' ? (
                                    <>
                                        <Pause className="w-4 h-4 mr-2" /> Pause Series
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4 mr-2" /> Resume Series
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-2 mt-4">
                    {/* View Generated Videos */}
                    <Link href={`/dashboard/series/${series.id}/videos`}>
                        <Button variant="outline" className="w-full text-zinc-600 border-zinc-200 bg-zinc-50 hover:bg-white">
                            <Video className="w-4 h-4 mr-2" />
                            View Generated Videos
                        </Button>
                    </Link>

                    {/* Trigger Generation */}
                    <Button
                        onClick={handleGenerate}
                        disabled={isLoading || series.status === 'processing'}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isLoading || series.status === 'processing' ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing</>
                        ) : (
                            <><Play className="w-4 h-4 mr-2" /> Generate Video</>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
