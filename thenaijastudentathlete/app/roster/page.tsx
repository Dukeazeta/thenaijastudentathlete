"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

// Mock Data
const athletes = [
    { id: 1, name: "Adaeze Okonkwo", sport: "Track & Field", school: "UNILAG", status: "Active" },
    { id: 2, name: "Chukwuemeka A.", sport: "Basketball", school: "ABU", status: "Recruited" },
    { id: 3, name: "Fatima Yusuf", sport: "Swimming", school: "Univ of Ibadan", status: "Active" },
    { id: 4, name: "David O.", sport: "Football", school: "UNIBEN", status: "Active" },
    { id: 5, name: "Sola Adebayo", sport: "Basketball", school: "Unilag", status: "Recruited" },
    { id: 6, name: "Grace N.", sport: "Track & Field", school: "UNN", status: "Active" },
    { id: 7, name: "Ibrahim K.", sport: "Football", school: "ABU", status: "Active" },
    { id: 8, name: "Zainab M.", sport: "Swimming", school: "LASU", status: "Active" },
];

const filters = {
    sports: ["All", "Track & Field", "Basketball", "Football", "Swimming"],
    status: ["All", "Active", "Recruited"],
    schools: ["All", "UNILAG", "ABU", "UNIBEN", "UI", "UNN", "LASU"]
};

export default function RosterPage() {
    const [activeSport, setActiveSport] = useState("All");

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* Sidebar Filter (Desktop: Col 3, Mobile: Drawer/Top) */}
                <aside className="col-span-1 lg:col-span-3 border-r-hard bg-surface p-6 lg:p-12 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="mb-12">
                        <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter mb-2">The <br /> Archive</h1>
                        <p className="font-body text-xs uppercase tracking-widest opacity-60">Official Database 2024</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-body text-xs font-bold uppercase tracking-widest mb-4">Discipline</h3>
                            <div className="flex flex-col gap-2">
                                {filters.sports.map(sport => (
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
                            <h3 className="font-body text-xs font-bold uppercase tracking-widest mb-4">Status</h3>
                            <div className="flex flex-col gap-2">
                                {filters.status.map(s => (
                                    <button key={s} className="text-left font-body text-sm uppercase tracking-wide opacity-60 hover:text-foreground hover:opacity-100 transition-colors">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Grid Content */}
                <div className="col-span-1 lg:col-span-9 bg-background">

                    {/* Header Metrics */}
                    <div className="border-b-hard p-6 lg:p-8 flex justify-between items-center bg-white">
                        <span className="font-body text-xs uppercase tracking-widest opacity-60">Showing {athletes.length} Records</span>
                        <div className="flex gap-4">
                            <button className="font-body text-xs uppercase tracking-widest hover:text-primary underline decoration-primary underline-offset-4">List View</button>
                            <button className="font-body text-xs uppercase tracking-widest opacity-40 hover:opacity-100">Grid View</button>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {athletes.map((athlete, i) => (
                            <motion.div
                                key={athlete.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative border-r-hard border-b-hard aspect-[4/5] overflow-hidden bg-surface hover:bg-white transition-colors duration-300 cursor-pointer"
                            >
                                {/* Placeholder Image Block */}
                                <div className="absolute top-0 left-0 w-full h-[65%] bg-neutral-200 group-hover:bg-neutral-300 transition-colors">
                                    {/* Real implementation would have <img /> here */}
                                    <div className="w-full h-full flex items-center justify-center opacity-20 font-display text-4xl">
                                        PHOTO
                                    </div>
                                </div>

                                {/* Info Block */}
                                <div className="absolute bottom-0 left-0 w-full h-[35%] p-6 flex flex-col justify-between border-t-hard bg-white">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-body text-[10px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-1">
                                                {athlete.sport}
                                            </span>
                                            <span className={`font-body text-[10px] uppercase tracking-widest ${athlete.status === 'Recruited' ? 'text-secondary' : 'text-neutral-400'}`}>
                                                {athlete.status}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-2xl uppercase tracking-tight leading-none">{athlete.name}</h3>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-body text-[10px] uppercase opacity-60">{athlete.school}</span>
                                        <span className="font-body text-xs group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </div>
            <Footer />
        </main>
    );
}
