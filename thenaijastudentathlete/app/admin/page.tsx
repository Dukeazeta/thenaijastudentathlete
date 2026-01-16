"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
    athletes: number;
    events: number;
    posts: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ athletes: 0, events: 0, posts: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [athletesRes, eventsRes, postsRes] = await Promise.all([
                fetch("/api/admin/athletes"),
                fetch("/api/admin/events"),
                fetch("/api/admin/posts"),
            ]);

            const athletes = athletesRes.ok ? await athletesRes.json() : [];
            const events = eventsRes.ok ? await eventsRes.json() : [];
            const posts = postsRes.ok ? await postsRes.json() : [];

            setStats({
                athletes: athletes.length,
                events: events.length,
                posts: posts.length,
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: "Total Athletes", value: stats.athletes, href: "/admin/athletes", color: "bg-primary" },
        { label: "Active Events", value: stats.events, href: "/admin/events", color: "bg-blue-600" },
        { label: "Journal Posts", value: stats.posts, href: "/admin/posts", color: "bg-purple-600" },
    ];

    const quickActions = [
        { label: "Add New Athlete", href: "/admin/athletes", icon: "+" },
        { label: "Create Event", href: "/admin/events", icon: "+" },
        { label: "Write Post", href: "/admin/posts", icon: "+" },
        { label: "Manage Options", href: "/admin/options", icon: "▼" },
    ];

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 md:mb-12">
                <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-1 md:mb-2">
                    Dashboard
                </h1>
                <p className="font-body text-xs md:text-sm uppercase tracking-widest text-white/40">
                    Content Management System
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="group border border-white/10 hover:border-white/30 transition-colors"
                    >
                        <div className={`${stat.color} p-1`} />
                        <div className="p-4 md:p-6">
                            <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-white/40 block mb-2">
                                {stat.label}
                            </span>
                            <span className="font-display text-4xl md:text-5xl text-white group-hover:text-primary transition-colors">
                                {loading ? "..." : stat.value}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8 md:mb-12">
                <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight mb-4 md:mb-6">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 p-4 md:p-6 border border-white/10 hover:bg-white/5 hover:border-primary transition-colors text-center md:text-left"
                        >
                            <span className="w-8 h-8 md:w-10 md:h-10 bg-white/10 flex items-center justify-center font-display text-lg md:text-xl text-primary">
                                {action.icon}
                            </span>
                            <span className="font-body text-[10px] md:text-sm uppercase tracking-widest">
                                {action.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Database Status */}
            {!loading && stats.athletes === 0 && stats.events === 0 && stats.posts === 0 && (
                <div className="border border-yellow-600/50 bg-yellow-600/10 p-4 md:p-6">
                    <h3 className="font-display text-lg md:text-xl uppercase tracking-tight text-yellow-500 mb-2">
                        ⚠ Get Started
                    </h3>
                    <p className="font-body text-xs md:text-sm text-white/60">
                        Your database is empty. Start by adding dropdown options, then create athletes, events, and posts.
                    </p>
                </div>
            )}
        </div>
    );
}
