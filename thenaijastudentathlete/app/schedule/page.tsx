import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getEvents } from "@/db/queries";
import { ScheduleClient } from "./ScheduleClient";

export default async function SchedulePage() {
    let months: { name: string; events: any[] }[] = [];

    try {
        months = await getEvents();
    } catch (error) {
        console.error("Failed to fetch events:", error);
    }

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20">

                {/* Header */}
                <div className="p-6 lg:p-24 border-b-hard bg-surface">
                    <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-4">Official <br />Season Calendar</h1>
                    <div className="flex gap-4">
                        <span className="font-body text-xs uppercase tracking-widest bg-primary text-white px-3 py-1">2026-2027</span>
                        <span className="font-body text-xs uppercase tracking-widest border border-black px-3 py-1">Phase 1</span>
                    </div>
                </div>

                {/* Calendar Grid */}
                <ScheduleClient months={months} />

            </div>
            <Footer />
        </main>
    );
}
