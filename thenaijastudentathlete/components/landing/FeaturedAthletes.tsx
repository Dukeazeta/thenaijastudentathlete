"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Athlete } from "@/db/schema";

interface FeaturedAthletesProps {
    athletes: Athlete[];
    totalCount?: number;
}

export function FeaturedAthletes({ athletes, totalCount = 142 }: FeaturedAthletesProps) {
    return (
        <section id="roster" className="bg-background border-b-hard">

            {/* Section Header: Modular Bar */}
            <div className="grid grid-cols-12 border-b-hard">
                <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r-hard p-6 md:p-8 bg-surface">
                    <span className="font-body text-xs uppercase tracking-widest text-primary font-bold">● The Roster</span>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-9 p-6 md:p-8 flex items-center justify-between">
                    <h2 className="font-display text-4xl uppercase tracking-tighter">Elite Prospects</h2>
                    <span className="font-body text-xs uppercase tracking-widest opacity-50 hidden md:block">Index 2026-Q1</span>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {athletes.length === 0 ? (
                    // Empty state
                    <div className="col-span-full p-12 text-center">
                        <p className="font-body text-sm uppercase tracking-widest opacity-40">
                            No featured athletes yet
                        </p>
                        <p className="font-body text-xs opacity-30 mt-2">
                            Add athletes via the admin panel
                        </p>
                    </div>
                ) : (
                    athletes.map((athlete, i) => (
                        <Link key={athlete.id} href={`/roster/view/${athlete.id}`} className="contents">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative border-r-hard border-b-hard aspect-[3/4] overflow-hidden block"
                            >
                                {/* Image Layer */}
                                <div className="absolute inset-0 bg-surface">
                                    {athlete.imageUrl ? (
                                        <img
                                            src={athlete.imageUrl}
                                            alt={athlete.name}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                                            <span className="font-display text-6xl opacity-10 uppercase">
                                                {athlete.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    {/* Green Flash Overlay (Desktop Only) */}
                                    <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-0 lg:group-hover:opacity-60 transition-opacity duration-300" />
                                </div>

                                {/* Info Card Slide-Up (Always visible on mobile) */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6">
                                    <div className="bg-background border-hard p-4 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 opacity-100 translate-y-0 shadow-xl lg:shadow-none">
                                        <span className="font-body text-[10px] uppercase tracking-widest text-primary block mb-1">
                                            {athlete.sport} // {athlete.primaryValue || '--'}
                                        </span>
                                        <h3 className="font-display text-2xl uppercase tracking-tight leading-none">{athlete.name}</h3>
                                        <div className="mt-4 pt-3 border-t-hard flex justify-between items-center">
                                            <span className="font-body text-[10px] uppercase opacity-60">{athlete.school}</span>
                                            <span className="font-display text-sm">↗</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Static Index Number */}
                                <div className="absolute top-0 left-0 p-4 font-display text-6xl text-white mix-blend-overlay opacity-80 lg:opacity-50 lg:group-hover:opacity-100 transition-opacity">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        </Link>
                    ))
                )}
            </div>

            {/* CTA Bar */}
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-9 border-r-hard p-8 bg-surface">
                    <p className="font-body text-sm uppercase tracking-wide opacity-60 max-w-xl">
                        Viewing {athletes.length} of {totalCount} Active Profiles. Complete database available for authorized recruiters.
                    </p>
                </div>
                <Link href="/roster" className="col-span-12 lg:col-span-3 p-8 flex items-center justify-center bg-primary text-white hover:bg-foreground transition-colors duration-300">
                    <span className="font-display text-xl uppercase tracking-tight mr-4">Full Roster</span>
                    <span>→</span>
                </Link>
            </div>

        </section>
    );
}
