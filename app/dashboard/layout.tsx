import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
            <DashboardSidebar />
            <div className="pl-64 flex flex-col min-h-screen">
                <DashboardHeader />
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
