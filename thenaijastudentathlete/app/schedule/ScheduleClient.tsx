"use client";

import { motion } from "framer-motion";

interface Event {
    id: number;
    title: string;
    location: string;
    type: string;
    day: string;
    month: string;
}

interface ScheduleClientProps {
    months: { name: string; events: Event[] }[];
}

export function ScheduleClient({ months }: ScheduleClientProps) {
    if (months.length === 0) {
        return (
            <div className="p-12 text-center border-b-hard">
                <p className="font-body text-sm uppercase tracking-widest opacity-40 mb-2">
                    No events scheduled
                </p>
                <p className="font-body text-xs opacity-30">
                    Add events via the admin panel
                </p>
            </div>
        );
    }

    return (
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
                                key={event.id || event.title}
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
    );
}
