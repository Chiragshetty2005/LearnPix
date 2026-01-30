import { UserButton } from "@clerk/nextjs";
import { syncUser } from "@/utils/clerk-sync";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    await syncUser();

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <UserButton />
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                        <h2 className="text-xl font-semibold mb-2">Projects</h2>
                        <p className="text-zinc-400">Manage your video projects here.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                        <h2 className="text-xl font-semibold mb-2">Schedule</h2>
                        <p className="text-zinc-400">View upcoming posts.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
                        <p className="text-zinc-400">Track your performance.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
