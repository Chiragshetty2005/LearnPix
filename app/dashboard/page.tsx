import { UserButton } from "@clerk/nextjs";
import { syncUser } from "@/utils/clerk-sync";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    await syncUser();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-zinc-900">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Projects</h2>
                    <p className="text-zinc-500">Manage your video projects here.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Schedule</h2>
                    <p className="text-zinc-500">View upcoming posts.</p>
                </div>
                <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-2 text-zinc-900">Analytics</h2>
                    <p className="text-zinc-500">Track your performance.</p>
                </div>
            </div>
        </div>
    );
}
