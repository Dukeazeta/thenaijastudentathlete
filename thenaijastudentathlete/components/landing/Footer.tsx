"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-foreground text-background relative border-t-hard pt-24 pb-12 overflow-hidden">

            <div className="px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24">

                {/* Brand Col */}
                <div className="flex flex-col gap-6">
                    <h2 className="font-display text-5xl tracking-tighter leading-none">TNSA.NGR</h2>
                    <p className="font-body text-xs uppercase tracking-widest opacity-60 leading-relaxed max-w-xs">
                        The official centralized platform for Nigerian Student Athlete development and data management.
                    </p>
                </div>

                {/* Links Col 1 */}
                <div className="flex flex-col gap-4">
                    <span className="font-body text-xs text-primary font-bold uppercase tracking-widest mb-2">Index</span>
                    {["Roster", "Mission", "Journal", "Schedule"].map((l) => (
                        <Link key={l} href="#" className="font-display text-xl uppercase tracking-tight hover:text-primary transition-colors">
                            {l}
                        </Link>
                    ))}
                </div>

                {/* Links Col 2 */}
                <div className="flex flex-col gap-4">
                    <span className="font-body text-xs text-primary font-bold uppercase tracking-widest mb-2">Official</span>
                    {["Partner Apply", "The Team", "Legal", "Credits"].map((l) => (
                        <Link key={l} href="#" className="font-display text-xl uppercase tracking-tight hover:text-primary transition-colors">
                            {l}
                        </Link>
                    ))}
                </div>

                {/* Newsletter / Action */}
                <div className="flex flex-col gap-6">
                    <span className="font-body text-xs text-primary font-bold uppercase tracking-widest">Connect</span>
                    <div className="flex border border-white/20 p-1">
                        <input
                            type="email"
                            placeholder="OFFICIAL EMAIL"
                            className="bg-transparent text-white font-body text-xs p-3 w-full outline-none uppercase placeholder:opacity-40"
                        />
                        <button className="bg-white text-black font-body text-[10px] font-bold uppercase px-4 hover:bg-primary hover:text-white transition-colors">
                            Submit
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Meta */}
            <div className="mt-24 px-6 lg:px-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center font-body text-[10px] uppercase tracking-widest opacity-40">
                <span>(C) 2026 The Naija Student Athlete. All Rights Reserved.</span>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <span>Lagos</span>
                    <span>Abuja</span>
                    <span>Global</span>
                </div>
            </div>

        </footer>
    );
}
