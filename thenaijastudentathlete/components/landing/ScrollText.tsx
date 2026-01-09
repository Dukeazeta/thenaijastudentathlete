"use client";

import { motion } from "framer-motion";

export function ScrollText() {
    return (
        <div className="bg-primary border-y-hard overflow-hidden py-4">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
                <div className="flex items-center gap-12 pr-12">
                    {Array(8).fill("OFFICIAL NIGERIAN ATHLETE DOSSIER ● ").map((text, i) => (
                        <span key={i} className="font-display text-2xl lg:text-3xl text-white uppercase tracking-tight">
                            {text}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-12 pr-12">
                    {Array(8).fill("OFFICIAL NIGERIAN ATHLETE DOSSIER ● ").map((text, i) => (
                        <span key={`dup-${i}`} className="font-display text-2xl lg:text-3xl text-white uppercase tracking-tight">
                            {text}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
