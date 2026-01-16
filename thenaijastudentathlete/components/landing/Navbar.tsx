"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[100] bg-background border-b-hard">
                <div className="grid grid-cols-12 h-20">

                    {/* Logo Module (Mobile: 8 Cols, Desktop: 2 Cols) */}
                    <div className="col-span-8 lg:col-span-2 border-r-hard flex items-center justify-start lg:justify-center px-6 lg:px-0 bg-primary hover:bg-foreground transition-colors duration-500 group">
                        <Link href="/" className="font-display text-2xl tracking-tighter text-white group-hover:text-primary transition-colors leading-none">
                            TNSA&reg; <br />
                            <span className="text-[10px] font-body tracking-widest font-normal opacity-80">NGR.OFFICIAL</span>
                        </Link>
                    </div>

                    {/* Navigation Module (Desktop - 8 Cols) */}
                    <div className="hidden lg:flex col-span-8 items-stretch">
                        {["Roster", "Mission", "Journal", "Schedule"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="flex-1 flex items-center justify-center border-r-hard font-body text-sm uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* Spacer for Mobile (Gone) - We use 8+4 grid now */}

                    {/* Action Module (Mobile: 4 Cols, Desktop: 2 Cols) */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="col-span-4 lg:col-span-2 flex flex-col items-center justify-center hover:bg-foreground hover:text-white transition-colors duration-300 group"
                    >
                        <div className="flex flex-col gap-1.5 items-end">
                            <span className="font-body text-[10px] uppercase tracking-widest group-hover:text-primary">Menu</span>
                            <div className="flex flex-col gap-1">
                                <div className="w-8 h-[2px] bg-foreground group-hover:bg-white transition-colors" />
                                <div className="w-8 h-[2px] bg-foreground group-hover:bg-white transition-colors" />
                            </div>
                        </div>
                    </button>
                </div>
            </header>

            {/* Swiss Modal Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[90] bg-background pt-20 flex flex-col"
                    >
                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">

                            {/* Visual Half */}
                            <div className="border-r-hard border-b-hard p-12 hidden lg:flex flex-col justify-between bg-surface relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary opacity-[0.05] pointer-events-none" />
                                <div className="font-display text-[15vw] leading-none text-foreground opacity-10 select-none">
                                    NGR
                                </div>
                                <div className="flex justify-between font-body text-xs uppercase tracking-widest opacity-60">
                                    <span>Ref. 2026-V1</span>
                                    <span>Official Grid</span>
                                </div>
                            </div>

                            {/* Navigation Half */}
                            <div className="flex flex-col h-full overflow-y-auto">
                                {["Home", "Roster", "Mission", "Journal", "Schedule", "Contact"].map((item, i) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 border-b-hard flex items-center px-6 lg:px-12 group hover:bg-primary hover:text-white transition-colors duration-300 min-h-[100px]"
                                    >
                                        <span className="font-body text-xs mr-4 lg:mr-8 opacity-40 group-hover:text-white">0{i + 1}</span>
                                        <span className="font-display text-4xl lg:text-7xl uppercase tracking-tight">{item}</span>
                                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                                    </Link>
                                ))}
                            </div>

                        </div>

                        {/* Footer Info Bar */}
                        <div className="grid grid-cols-4 border-t-hard h-16 divide-x divide-black text-[10px] sm:text-xs font-body uppercase tracking-wider text-center items-center bg-white text-foreground">
                            <div className="py-4">Lagos</div>
                            <div className="py-4">2026</div>
                            <div className="py-4 text-primary font-bold">Online</div>
                            <div className="py-4 cursor-pointer hover:bg-foreground hover:text-white transition-colors" onClick={() => setIsOpen(false)}>Close</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
