"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const news = [
    {
        id: "J-001",
        date: "04.03.24",
        category: "Press Release",
        title: "TNSA Partners with Lagos State Sports Commission",
        preview: "A historic memorandum of understanding has been signed to integrate student-athlete development tracks directly into the state curriculum.",
        tags: ["Policy", "Partnership"]
    },
    {
        id: "J-002",
        date: "28.02.24",
        category: "Editorial",
        title: "The Unseen Grind: 5AM at Unilag Sports Complex",
        preview: "Our editorial team documents the morning routines of national hopefuls preparing for the upcoming West African University Games.",
        tags: ["Feature", "Training"]
    },
    {
        id: "J-003",
        date: "15.02.24",
        category: "Recruitment",
        title: "Scholarship Index Q1 Report Released",
        preview: "The latest standardized metrics for U19 basketball prospects have been published. Access the full data dossier in the portal.",
        tags: ["Data", "Report"]
    },
    {
        id: "J-004",
        date: "01.02.24",
        category: "Event",
        title: "Official Wrap-Up: The Abuja Combine",
        preview: "Over 400 athletes, 12 universities, and 1 goal. A complete breakdown of the top performers from last weekend's showcase.",
        tags: ["Recap", "Abuja"]
    }
];

export default function JournalPage() {
    return (
        <main className="bg-background min-h-screen font-sans">
            <Navbar />

            <div className="pt-20 min-h-screen flex flex-col">

                {/* Header Block */}
                <section className="bg-primary text-white p-6 lg:p-24 border-b-hard">
                    <h1 className="font-display text-6xl lg:text-9xl uppercase tracking-tighter leading-none mb-6">
                        The <br /> Gazette
                    </h1>
                    <div className="max-w-xl border-t border-white/20 pt-6 flex justify-between items-end">
                        <p className="font-body text-sm uppercase tracking-widest opacity-80">
                            Official Press, <br /> Editorial Features, <br /> & Federation Updates.
                        </p>
                        <span className="font-display text-4xl">2024</span>
                    </div>
                </section>

                {/* News List */}
                <section className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-12">
                        {news.map((item, i) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group grid grid-cols-1 lg:grid-cols-12 border-b-hard hover:bg-surface transition-colors duration-300 cursor-pointer"
                            >

                                {/* Date Col */}
                                <div className="col-span-1 lg:col-span-2 p-6 lg:p-12 border-b-hard lg:border-b-0 lg:border-r-hard flex items-start justify-between lg:block">
                                    <span className="font-display text-2xl lg:text-3xl text-primary">{item.date}</span>
                                    {/* Mobile Only Tag */}
                                    <span className="lg:hidden font-body text-[10px] uppercase tracking-widest font-bold bg-foreground text-white px-2 py-1">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Content Col */}
                                <div className="col-span-1 lg:col-span-7 p-6 lg:p-12 flex flex-col justify-center">
                                    <div className="hidden lg:flex items-center gap-4 mb-4">
                                        <span className="font-body text-[10px] uppercase tracking-widest font-bold bg-foreground text-white px-2 py-1">
                                            {item.category}
                                        </span>
                                        <span className="font-body text-[10px] uppercase tracking-widest opacity-40">
                                            REF: {item.id}
                                        </span>
                                    </div>
                                    <h2 className="font-display text-3xl lg:text-5xl uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h2>
                                    <p className="font-body text-base opacity-60 max-w-2xl leading-relaxed">
                                        {item.preview}
                                    </p>
                                </div>

                                {/* Action Col */}
                                <div className="col-span-1 lg:col-span-3 p-6 lg:p-12 border-t-hard lg:border-t-0 lg:border-l-hard flex flex-row lg:flex-col justify-between items-center lg:items-end bg-white/50">
                                    <div className="flex gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="font-body text-[10px] uppercase tracking-widest border border-black/10 px-2 py-1 opacity-50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="font-display text-xl lg:text-2xl group-hover:translate-x-2 transition-transform">Read →</span>
                                </div>

                            </motion.article>
                        ))}
                    </div>
                </section>

            </div>
            <Footer />
        </main>
    );
}
