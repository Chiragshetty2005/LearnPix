import { syncUser } from "@/utils/clerk-sync";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { SeriesList } from "@/components/dashboard/series-list";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    await syncUser();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-zinc-900">Dashboard Overview</h1>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/dashboard/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Series
                    </Link>
                </Button>
            </div>

            <SeriesList />
        </div>
    );
}
