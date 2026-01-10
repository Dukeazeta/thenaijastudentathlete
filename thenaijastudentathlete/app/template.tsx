"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* The Shutter Overlay */}
            <motion.div
                id="shutter"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[100] bg-primary origin-top pointer-events-none"
            >
                <div className="absolute bottom-4 left-4 lg:bottom-12 lg:left-12 text-white font-body text-[10px] uppercase tracking-widest opacity-50">
                    System Loading...
                </div>
            </motion.div>
            {children}
        </motion.div>
    )
}
