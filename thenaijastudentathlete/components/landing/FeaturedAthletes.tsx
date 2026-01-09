"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Athlete {
    id: number;
    name: string;
    sport: string;
    school: string;
    stat: string;
    image: string;
}

const athletes: Athlete[] = [
    {
        id: 1,
        name: "Adaeze Okonkwo",
        sport: "Track & Field",
        school: "UNILAG",
        stat: "11.12s",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 2,
        name: "Chukwuemeka A.",
        sport: "Basketball",
        school: "ABU",
        stat: "24.5 PPG",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 3,
        name: "Fatima Yusuf",
        sport: "Swimming",
        school: "Univ of Ibadan",
        stat: "NR Holder",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 4,
        name: "David O.",
        sport: "Football",
        school: "UNIBEN",
        stat: "15 Goals",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
    },
];

export function FeaturedAthletes() {
    return (
        <section id="roster" className="bg-background border-b-hard">

            {/* Section Header: Modular Bar */}
            <div className="grid grid-cols-12 border-b-hard">
                <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r-hard p-6 md:p-8 bg-surface">
                    <span className="font-body text-xs uppercase tracking-widest text-primary font-bold">● The Roster</span>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-9 p-6 md:p-8 flex items-center justify-between">
                    <h2 className="font-display text-4xl uppercase tracking-tighter">Elite Prospects</h2>
                    <span className="font-body text-xs uppercase tracking-widest opacity-50 hidden md:block">Index 2024-Q1</span>
                </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {athletes.map((athlete, i) => (
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
                                <img
                                    src={athlete.image}
                                    alt={athlete.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Green Flash Overlay (Desktop Only) */}
                                <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-0 lg:group-hover:opacity-60 transition-opacity duration-300" />
                            </div>

                            {/* Info Card Slide-Up (Always visible on mobile) */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="bg-background border-hard p-4 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 opacity-100 translate-y-0 shadow-xl lg:shadow-none">
                                    <span className="font-body text-[10px] uppercase tracking-widest text-primary block mb-1">{athlete.sport} // {athlete.stat}</span>
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
                ))}
            </div>

            {/* CTA Bar */}
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-9 border-r-hard p-8 bg-surface">
                    <p className="font-body text-sm uppercase tracking-wide opacity-60 max-w-xl">
                        Viewing {athletes.length} of 142 Active Profiles. Complete database available for authorized recruiters.
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
