"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { use, useState, useEffect } from "react";

// Mock Database with Rich Data
const athletesDB: Record<string, any> = {
    "1": {
        id: "TNSA-24-0001",
        name: "Adaeze Okonkwo",
        sport: "Track & Field",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
        stats: { age: "19", height: "5'11\"", weight: "145lbs", class: "2026", school: "UNILAG", gpa: "3.8/4.0", major: "Human Kinetics" },
        performance: {
            primary: "100m Dash", value: "11.12s", history: [
                { event: "Lagos Open '23", result: "1st / 11.2s" },
                { event: "National Trials", result: "2nd / 11.15s" },
                { event: "UniGames 2024", result: "1st / 11.12s" }
            ]
        }
    },
    "2": {
        id: "TNSA-24-0002",
        name: "Chukwuemeka A.",
        sport: "Basketball",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200",
        stats: { age: "20", height: "6'7\"", weight: "210lbs", class: "2025", school: "ABU Zaria", gpa: "3.5/4.0", major: "Computer Sci" },
        performance: {
            primary: "Points Per Game", value: "24.5", history: [
                { event: "Zaria Conference", result: "MVP / 28 PPG" },
                { event: "Varsity League", result: "Champs" },
                { event: "All-Stars '23", result: "Selected" }
            ]
        }
    },
    "3": {
        id: "TNSA-24-0003",
        name: "Fatima Yusuf",
        sport: "Swimming",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=1200",
        stats: { age: "18", height: "5'9\"", weight: "135lbs", class: "2027", school: "Univ of Ibadan", gpa: "4.0/4.0", major: "Medicine" },
        performance: {
            primary: "50m Freestyle", value: "25.4s", history: [
                { event: "West Afr. Games", result: "Gold" },
                { event: "State Meet", result: "Record Holder" },
                { event: "National Camp", result: "Invited" }
            ]
        }
    },
    "4": {
        id: "TNSA-24-0004",
        name: "David O.",
        sport: "Football",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
        stats: { age: "21", height: "6'2\"", weight: "185lbs", class: "2024", school: "UNIBEN", gpa: "3.2/4.0", major: "Economics" },
        performance: {
            primary: "Goals", value: "15", history: [
                { event: "League Season", result: "Top Scorer" },
                { event: "FA Cup", result: "Finalist" },
                { event: "Scout Showcase", result: "Man of Match" }
            ]
        }
    }
};

// Default template for others
const defaultAthlete = {
    id: "TNSA-24-XXXX",
    name: "Prospect Profile",
    sport: "Unlisted Discipline",
    image: null,
    stats: { age: "--", height: "--", weight: "--", class: "--", school: "Unknown Inst.", gpa: "--", major: "--" },
    performance: { primary: "Metric", value: "--", history: [] }
};

export default function AthleteProfilePage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const athleteData = athletesDB[resolvedParams.id] || { ...defaultAthlete, name: `Athlete ${resolvedParams.id}`, id: `TNSA-24-00${resolvedParams.id}` };

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* Left: ID & Stats Block */}
                <aside className="col-span-1 lg:col-span-4 border-r-hard bg-surface p-6 lg:p-12 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto flex flex-col justify-between">
                    <div>
                        <div className="aspect-[3/4] bg-neutral-200 w-full mb-8 relative overflow-hidden group">
                            {athleteData.image ? (
                                <img src={athleteData.image} alt={athleteData.name} className="w-full h-full object-cover grayscale" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center font-display text-5xl opacity-10 uppercase">
                                    Portrait
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full bg-primary text-white p-2 text-center font-body text-xs uppercase tracking-widest">
                                Status: Active
                            </div>
                        </div>

                        <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter leading-none mb-2">
                            {athleteData.name.split(" ").map((n: string, i: number) => <span key={i} className="block">{n}</span>)}
                        </h1>
                        <p className="font-body text-sm uppercase tracking-widest opacity-60 mb-8">
                            ID: {athleteData.id}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Age</span>
                                <span className="block font-display text-2xl">{athleteData.stats.age}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Height</span>
                                <span className="block font-display text-2xl">{athleteData.stats.height}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Weight</span>
                                <span className="block font-display text-2xl">{athleteData.stats.weight}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Class</span>
                                <span className="block font-display text-2xl">{athleteData.stats.class}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/contact" className="w-full block text-center bg-black text-white py-4 font-display text-xl uppercase tracking-widest hover:bg-primary transition-colors">
                            Request Data
                        </Link>
                    </div>
                </aside>

                {/* Right: Performance Data */}
                <div className="col-span-1 lg:col-span-8 bg-background">

                    {/* Header Spec */}
                    <div className="border-b-hard p-6 lg:p-12 flex justify-between items-end bg-white">
                        <div>
                            <span className="font-body text-xs uppercase tracking-widest text-primary font-bold mb-2 block">Primary Discipline</span>
                            <span className="font-display text-4xl lg:text-6xl uppercase tracking-tighter">{athleteData.sport}</span>
                        </div>
                        <div className="text-right">
                            <span className="font-body text-xs uppercase tracking-widest opacity-40 block mb-1">Key Stat</span>
                            <span className="font-display text-4xl lg:text-5xl text-primary">{athleteData.performance.value}</span>
                            <span className="font-body text-[10px] uppercase tracking-widest opacity-60 block">{athleteData.performance.primary}</span>
                        </div>
                    </div>

                    {/* Additional Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b-hard">
                        <div className="p-6 lg:p-12 border-b-hard md:border-b-0 md:border-r-hard">
                            <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Results History</h3>
                            <ul className="space-y-4">
                                {athleteData.performance.history.length > 0 ? athleteData.performance.history.map((h: any, i: number) => (
                                    <li key={i} className="flex justify-between border-b border-black/10 pb-2">
                                        <span className="font-body text-sm uppercase">{h.event}</span>
                                        <span className="font-display text-lg">{h.result}</span>
                                    </li>
                                )) : (
                                    <li className="font-body text-sm opacity-60">No recent public data available.</li>
                                )}
                            </ul>
                        </div>
                        <div className="p-6 lg:p-12 bg-surface">
                            <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Academics</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">Institution</span>
                                    <span className="font-body text-lg">{athleteData.stats.school}</span>
                                </div>
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">GPA</span>
                                    <span className="font-body text-lg">{athleteData.stats.gpa}</span>
                                </div>
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">Major</span>
                                    <span className="font-body text-lg">{athleteData.stats.major}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video / Media Section */}
                    <div className="p-6 lg:p-12">
                        <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Visual Evidence</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video bg-black flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-colors">
                                <span className="font-display text-xl uppercase">Play Tape 01</span>
                            </div>
                            <div className="aspect-video bg-neutral-200 flex items-center justify-center text-black/20 font-display text-xl uppercase">
                                Unavailable
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </main>
    );
}
