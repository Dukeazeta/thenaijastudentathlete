"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function ArticlePage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* Article Header & Meta (Sticky Left) */}
                <aside className="col-span-1 lg:col-span-4 border-r-hard bg-surface p-6 lg:p-12 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto">
                    <div className="mb-12">
                        <span className="font-body text-xs uppercase tracking-widest text-primary font-bold bg-primary/10 px-2 py-1 mb-4 inline-block">
                            Press Release
                        </span>
                        <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter leading-none mb-8">
                            TNSA Partners with Lagos State Sports Commission
                        </h1>
                        <div className="flex flex-col gap-4 border-t-hard pt-8">
                            <div>
                                <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block mb-1">Date</span>
                                <span className="font-body text-sm uppercase tracking-wide">04.03.2024</span>
                            </div>
                            <div>
                                <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block mb-1">Author</span>
                                <span className="font-body text-sm uppercase tracking-wide">Editorial Desk</span>
                            </div>
                            <div>
                                <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block mb-1">Read Time</span>
                                <span className="font-body text-sm uppercase tracking-wide">4 Min</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <Link href="/journal" className="font-body text-xs uppercase tracking-widest opacity-60 hover:text-primary hover:opacity-100 transition-colors">
                                ← Back to Gazette
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Content (Right) */}
                <article className="col-span-1 lg:col-span-8 bg-background p-6 lg:p-24">
                    <div className="prose max-w-2xl">
                        <p className="font-display text-2xl uppercase leading-tight mb-8">
                            A historic memorandum of understanding has been signed to integrate student-athlete development tracks directly into the state curriculum.
                        </p>
                        <p className="font-body text-lg leading-relaxed opacity-80 mb-6">
                            LAGOS — The Naija Student Athlete (TNSA) has officially entered into a strategic partnership with the Lagos State Sports Commission (LSSC). This collaboration marks a pivotal shift in how athletic talent is identified, nurtured, and exported from the region.
                        </p>
                        <p className="font-body text-lg leading-relaxed opacity-80 mb-6">
                            Under the new agreement, TNSA will provide its proprietary verification and data-tracking infrastructure to over 140 public and private secondary schools across the state. This ensures that high-potential athletes are not only scouted but are also academically cleared for global scholarship opportunities.
                        </p>
                        <div className="border border-black/10 p-8 my-12 bg-surface">
                            <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block mb-4">Official Quote</span>
                            <p className="font-display text-xl uppercase italic">
                                "This is not just about sports. It is about creating a viable, documented career pathway for our youth. TNSA provides the rigour we have been missing."
                            </p>
                        </div>
                        <p className="font-body text-lg leading-relaxed opacity-80 mb-6">
                            The pilot phase of this program begins in Q2 2024, focusing on Track & Field and Basketball. Representatives from international collegiate federations have already expressed interest in the inaugural data set that will be produced from this combine.
                        </p>
                        <p className="font-body text-lg leading-relaxed opacity-80">
                            Further updates regarding the specific schools selected for the pilot will be released in the coming weeks via the official gazette.
                        </p>
                    </div>
                </article>

            </div>
            <Footer />
        </main>
    );
}
