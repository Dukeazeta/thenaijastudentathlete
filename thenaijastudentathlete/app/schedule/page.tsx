"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

// Mock Schedule Data
const months = [
    {
        name: "February 2024",
        events: [
            { day: "14", title: "National Prep Combine", location: "Lagoon Stadium, Lagos", type: "Open" },
            { day: "28", title: "University Showcase", location: "Unilag Sports Center", type: "Invite Only" }
        ]
    },
    {
        name: "March 2024",
        events: [
            { day: "10", title: "Scouted: Basketball Series", location: "Indoor Sports Hall, Abuja", type: "Open" },
            { day: "25", title: "Track & Field Qualifiers", location: "Liberty Stadium, Ibadan", type: "Federation" }
        ]
    },
    {
        name: "April 2024",
        events: [
            { day: "05", title: "Scholarship Summit", location: "Virtual / Zoom", type: "Webinar" },
            { day: "18", title: "Elite 100 Camp", location: "Teslim Balogun, Lagos", type: "Invite Only" }
        ]
    }
];

export default function SchedulePage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20">

                {/* Header */}
                <div className="p-6 lg:p-24 border-b-hard bg-surface">
                    <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-4">Official <br /> Season Calendar</h1>
                    <div className="flex gap-4">
                        <span className="font-body text-xs uppercase tracking-widest bg-primary text-white px-3 py-1">2024-2025</span>
                        <span className="font-body text-xs uppercase tracking-widest border border-black px-3 py-1">Phase 1</span>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="flex flex-col">
                    {months.map((month, i) => (
                        <div key={month.name} className="border-b-hard last:border-b-0">
                            {/* Month Header */}
                            <div className="p-6 lg:px-12 lg:py-8 bg-black text-white flex justify-between items-center sticky top-20 z-10 border-b border-white/20">
                                <h2 className="font-display text-2xl lg:text-3xl uppercase tracking-tight">{month.name}</h2>
                                <span className="font-body text-[10px] uppercase tracking-widest opacity-60">{month.events.length} Events Scheduled</span>
                            </div>

                            {/* Events List */}
                            <div className="divide-y divide-black/10">
                                {month.events.map((event, j) => (
                                    <motion.div
                                        key={event.title}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        className="group grid grid-cols-1 lg:grid-cols-12 hover:bg-surface transition-colors duration-300"
                                    >
                                        <div className="col-span-1 lg:col-span-2 p-6 lg:p-8 flex items-center lg:border-r-hard">
                                            <span className="font-display text-4xl lg:text-5xl text-primary">{event.day}</span>
                                        </div>
                                        <div className="col-span-1 lg:col-span-7 p-6 lg:p-8 flex flex-col justify-center">
                                            <h3 className="font-display text-xl lg:text-3xl uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                                            <div className="flex items-center gap-2 font-body text-xs uppercase tracking-widest opacity-60">
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-1 lg:col-span-3 p-6 lg:p-8 flex items-center justify-start lg:justify-end lg:border-l-hard">
                                            <span className={`font-body text-[10px] uppercase tracking-widest px-3 py-1 font-bold border ${event.type === 'Open' ? 'border-primary text-primary' : 'border-black text-black'}`}>
                                                {event.type}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <Footer />
        </main>
    );
}
