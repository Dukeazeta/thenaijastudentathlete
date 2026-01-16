"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import type { Athlete } from "@/db/schema";

interface RosterClientProps {
    athletes: Athlete[];
    sports: string[];
    statuses: string[];
}

export function RosterClient({ athletes, sports, statuses }: RosterClientProps) {
    const [activeSport, setActiveSport] = useState("All");
    const [activeStatus, setActiveStatus] = useState("All");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    const filteredAthletes = athletes.filter(athlete => {
        const sportMatch = activeSport === "All" || athlete.sport === activeSport;
        const statusMatch = activeStatus === "All" || (athlete.status || "active") === activeStatus.toLowerCase();
        return sportMatch && statusMatch;
    });

    return (
        <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 min-h-screen">

            {/* Sidebar Filter (Desktop: Col 3, Mobile: Drawer/Top) */}
            <aside className="col-span-1 lg:col-span-3 border-r-hard bg-surface lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300">

                {/* Mobile Toggle Header */}
                <div
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-6 border-b-hard flex justify-between items-center cursor-pointer bg-white sticky top-0 z-20"
                >
                    <span className="font-body text-xs uppercase tracking-widest font-bold">Refine Database</span>
                    <span className="font-display text-xl">{showFilters ? '−' : '+'}</span>
                </div>

                <div className={`p-6 lg:p-12 ${showFilters ? 'block border-b-hard lg:border-none' : 'hidden lg:block'}`}>
                    <div className="mb-12 hidden lg:block">
                        <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-2">The <br />Archive</h1>
                        <p className="font-body text-xs uppercase tracking-widest opacity-60">Official Database 2026</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-body text-xs font-bold uppercase tracking-widest mb-4 opacity-40 lg:opacity-100">Discipline</h3>
                            <div className="flex flex-col gap-2">
                                {sports.map(sport => (
                                    <button
                                        key={sport}
                                        onClick={() => setActiveSport(sport)}
                                        className={`text-left font-body text-sm uppercase tracking-wide transition-colors ${activeSport === sport ? 'text-primary font-bold' : 'opacity-60 hover:text-foreground hover:opacity-100'}`}
                                    >
                                        {activeSport === sport && <span className="mr-2 text-primary">●</span>}
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-body text-xs font-bold uppercase tracking-widest mb-4 opacity-40 lg:opacity-100">Status</h3>
                            <div className="flex flex-col gap-2">
                                {statuses.map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setActiveStatus(s)}
                                        className={`text-left font-body text-sm uppercase tracking-wide transition-colors ${activeStatus === s ? 'text-primary font-bold' : 'opacity-60 hover:text-foreground hover:opacity-100'}`}
                                    >
                                        {activeStatus === s && <span className="mr-2 text-primary">●</span>}
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Grid Content */}
            <div className="col-span-1 lg:col-span-9 bg-background">

                {/* Header Metrics */}
                <div className="border-b-hard p-6 lg:p-8 flex justify-between items-center bg-white sticky top-20 z-10">
                    <span className="font-body text-xs uppercase tracking-widest opacity-60">Showing {filteredAthletes.length} Records</span>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`font-body text-xs uppercase tracking-widest hover:text-primary underline-offset-4 ${viewMode === 'list' ? 'text-primary font-bold underline decoration-primary' : 'opacity-40'}`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`font-body text-xs uppercase tracking-widest hover:text-primary underline-offset-4 ${viewMode === 'grid' ? 'text-primary font-bold underline decoration-primary' : 'opacity-40'}`}
                        >
                            Grid View
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                {filteredAthletes.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="font-body text-sm uppercase tracking-widest opacity-40 mb-2">
                            No athletes found
                        </p>
                        <p className="font-body text-xs opacity-30">
                            {athletes.length === 0 ? "Add athletes via the admin panel" : "Try adjusting your filters"}
                        </p>
                    </div>
                )}

                {/* Results Container */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col"}>
                    {filteredAthletes.map((athlete, i) => (
                        <Link key={athlete.id} href={`/roster/view/${athlete.id}`} className="contents">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={viewMode === 'grid'
                                    ? "group relative border-r-hard border-b-hard aspect-[4/5] overflow-hidden bg-surface hover:bg-white transition-colors duration-300 cursor-pointer"
                                    : "group grid grid-cols-12 border-b-hard p-4 lg:p-6 hover:bg-surface cursor-pointer items-center"
                                }
                            >
                                {viewMode === 'grid' ? (
                                    // GRID LAYOUT
                                    <>
                                        <div className="absolute top-0 left-0 w-full h-[65%] bg-neutral-200 group-hover:bg-neutral-300 transition-colors overflow-hidden">
                                            {athlete.imageUrl ? (
                                                <img
                                                    src={athlete.imageUrl}
                                                    alt={athlete.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-20 font-display text-4xl">
                                                    {athlete.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full h-[35%] p-6 flex flex-col justify-between border-t-hard bg-white">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-body text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-1">
                                                        {athlete.sport}
                                                    </span>
                                                    <span className={`font-body text-[10px] uppercase tracking-widest ${athlete.status === 'graduated' ? 'text-secondary' : 'text-neutral-400'}`}>
                                                        {athlete.status || 'Active'}
                                                    </span>
                                                </div>
                                                <h3 className="font-display text-2xl uppercase tracking-tight leading-none">{athlete.name}</h3>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="font-body text-[10px] uppercase opacity-60">{athlete.school}</span>
                                                <span className="font-body text-xs group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // LIST LAYOUT
                                    <>
                                        <div className="col-span-2 lg:col-span-1 font-body text-[10px] opacity-40">{athlete.id}</div>
                                        <div className="col-span-8 lg:col-span-4 font-display text-xl uppercase tracking-tight">{athlete.name}</div>
                                        <div className="hidden lg:flex col-span-3 items-center">
                                            <span className="font-body text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-1">
                                                {athlete.sport}
                                            </span>
                                        </div>
                                        <div className="hidden lg:block col-span-2 text-[10px] uppercase tracking-widest opacity-60">{athlete.school}</div>
                                        <div className="col-span-2 flex justify-end">
                                            <span className={`font-body text-[10px] uppercase tracking-widest ${athlete.status === 'graduated' ? 'text-secondary' : 'text-neutral-400'}`}>
                                                {athlete.status || 'Active'}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>

        </div>
    );
}
