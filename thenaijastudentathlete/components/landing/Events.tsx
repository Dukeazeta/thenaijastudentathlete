"use client";

import { motion } from "framer-motion";

interface Event {
    id: number;
    day: string;
    month: string;
    title: string;
    location: string;
    status: string;
}

const events: Event[] = [
    {
        id: 1,
        day: "14",
        month: "FEB",
        status: "Open Reg.",
        title: "Prep Combine",
        location: "Lagos, NG",
    },
    {
        id: 2,
        day: "02",
        month: "MAR",
        status: "Closed",
        title: "Scholarship Expo",
        location: "Abuja, NG",
    },
    {
        id: 3,
        day: "18",
        month: "APR",
        status: "Invite Only",
        title: "Track Invitational",
        location: "Unilag, NG",
    },
];

export function Events() {
    return (
        <section id="schedule" className="bg-primary text-white border-b-hard overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[60vh]">

                {/* Left: Schedule Header */}
                <div className="col-span-1 lg:col-span-4 border-r border-black/20 p-12 lg:p-16 bg-primary flex flex-col justify-between">
                    <h2 className="font-display text-5xl lg:text-6xl uppercase tracking-tighter leading-none">
                        Official <br /> Schedule
                    </h2>
                    <div className="mt-8 lg:mt-12 font-body text-sm uppercase tracking-wide opacity-80 border-t border-white/20 pt-8">
                        <p>All dates subject to federation approval.</p>
                        <p>Phase 2 Registration is Active.</p>
                    </div>
                </div>

                {/* Right: The Timeline Grid */}
                <div className="col-span-1 lg:col-span-8 bg-background text-foreground">
                    {events.map((e, i) => (
                        <motion.div
                            key={e.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col md:grid md:grid-cols-12 border-b-hard last:border-b-0 group hover:bg-surface transition-colors duration-300 cursor-pointer min-h-[160px] md:h-40"
                        >
                            {/* Date Block */}
                            <div className="md:col-span-3 lg:col-span-2 border-b-hard md:border-b-0 md:border-r-hard md:h-full flex flex-row md:flex-col items-center justify-between md:justify-center p-6 bg-surface md:bg-transparent">
                                <div className="flex items-baseline gap-2 md:flex-col md:items-center">
                                    <span className="font-display text-4xl lg:text-5xl">{e.day}</span>
                                    <span className="font-body text-xs font-bold uppercase tracking-widest opacity-60 md:mt-1">{e.month}</span>
                                </div>
                                <span className="md:hidden font-body text-[10px] uppercase font-bold text-primary">{e.status}</span>
                            </div>

                            {/* Info Block */}
                            <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center px-6 py-6 md:px-8">
                                <span className="hidden md:block font-body text-[10px] uppercase tracking-widest text-primary font-bold mb-1 group-hover:text-foreground">{e.status}</span>
                                <h3 className="font-display text-3xl lg:text-4xl uppercase tracking-tight">{e.title}</h3>
                            </div>

                            {/* Location Block */}
                            <div className="md:col-span-3 lg:col-span-3 border-t-hard md:border-t-0 md:border-l-hard md:h-full flex flex-col items-center justify-center bg-gray-50 group-hover:bg-primary group-hover:text-white transition-colors duration-300 p-4 text-center">
                                <span className="font-body text-xs uppercase tracking-widest">{e.location}</span>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
