"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "@/components/landing";
import Image from "next/image";

// Mock Team Data
const TEAM_MEMBERS = [
    {
        id: 1,
        name: "David Olatunde",
        role: "Executive Director",
        image: "/images/team/executive.png",
        bio: "Visionary leader focused on transforming the student-athlete landscape in Nigeria."
    },
    {
        id: 2,
        name: "Sarah Adebayo",
        role: "Head of Operations",
        image: "/images/team/operations.png",
        bio: "Executing the strategy with precision and organizing nationwide events."
    },
    {
        id: 3,
        name: "Michael Okonkwo",
        role: "Creative Director",
        image: "/images/team/creative.png",
        bio: "Crafting the visual identity and narrative of the Nigerian athlete."
    },
    {
        id: 4,
        name: "Zainab Ibrahim",
        role: "Scouting Lead",
        image: "/images/team/scout.png",
        bio: "Identifying the next generation of champions from grassroots to podium."
    },
];

export default function TeamsPage() {
    return (
        <main className="relative bg-background min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 px-6 lg:px-12 border-b border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tighter uppercase mb-6"
                    >
                        The Minds<br />
                        <span className="text-primary">Behind The</span><br />
                        Movement
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="font-body text-sm md:text-base uppercase tracking-widest text-white/60 max-w-xl"
                    >
                        A collective of visionaries, strategists, and creatives dedicated to elevating the Nigerian Student Athlete.
                    </motion.p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="px-6 lg:px-12 py-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {TEAM_MEMBERS.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-6">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <p className="font-body text-sm text-white/80 line-clamp-3">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 border-t border-white/20 pt-4 group-hover:border-primary transition-colors duration-500">
                                <span className="font-body text-xs text-primary uppercase tracking-widest">
                                    {member.role}
                                </span>
                                <h3 className="font-display text-4xl uppercase tracking-tighter">
                                    {member.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative px-6 lg:px-12 py-32 border-t border-white/10 bg-primary/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-8 text-transparent stroke-text hover:text-white transition-colors duration-500 cursor-default">
                        Join The Ranks
                    </h2>
                    <p className="font-body text-sm md:text-base uppercase tracking-widest text-white/60 mb-12 max-w-xl mx-auto">
                        We are always looking for passionate individuals to join our mission. If you have the grit, we have the glory.
                    </p>
                    <button className="bg-primary text-white px-12 py-4 font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                        View Openings
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
