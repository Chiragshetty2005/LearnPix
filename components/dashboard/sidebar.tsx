import Link from "next/link";
import Image from "next/image";
import {
    Play,
    Video,
    BookOpen,
    CreditCard,
    Settings,
    Zap,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: Play, label: "Series", href: "/dashboard/series" },
    { icon: Video, label: "Video", href: "/dashboard/video" },
    { icon: BookOpen, label: "Guides", href: "/dashboard/guides" },
    { icon: CreditCard, label: "Billing Setting", href: "/dashboard/billing" },
];

export function DashboardSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col h-screen fixed left-0 top-0 z-40">
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="VidMaxx Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                    <span className="font-bold text-xl text-zinc-900 tracking-tight">VidMaxx</span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                {/* Main Action */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-base font-medium shadow-sm mb-8">
                    <Plus className="w-5 h-5 mr-2" />
                    Create New Series
                </Button>

                {/* Menu */}
                <nav className="space-y-2 flex-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                        >
                            <item.icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-600" />
                            <span className="font-medium text-lg">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="mt-auto space-y-4 pt-6 border-t border-zinc-100">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-600 rounded-md">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-zinc-900">Upgrade Plan</span>
                        </div>
                        <p className="text-sm text-zinc-500 mb-3">Unlock advanced features</p>
                        <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 bg-white">
                            Upgrade
                        </Button>
                    </div>

                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Profile Settings</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
