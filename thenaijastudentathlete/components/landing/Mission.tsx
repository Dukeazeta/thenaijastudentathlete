"use client";

import { motion } from "framer-motion";

interface Value {
    id: string;
    title: string;
    description: string;
}

const values: Value[] = [
    {
        id: "01",
        title: "Identification",
        description: "Systematic surveillance of collegiate leagues to isolate high-variance athletic outliers."
    },
    {
        id: "02",
        title: "Documentation",
        description: "Production of broadcast-quality visual dossiers and standardized biometric data."
    },
    {
        id: "03",
        title: "Placement",
        description: "Direct transmission of verified athlete profiles to international scholarship networks."
    }
];

export function Mission() {
    return (
        <section id="mission" className="bg-surface border-b-hard overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">

                {/* Left: The Manifesto (Typographic Block) */}
                <div className="col-span-1 lg:col-span-5 border-r-hard p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-background">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary mb-8 lg:mb-12" /> {/* Abstract Swiss Square */}
                        <h2 className="font-display text-4xl md:text-5xl lg:text-7xl uppercase tracking-tighter leading-[0.9] mb-8 lg:mb-12">
                            Standardizing <br />
                            <span className="text-primary">Excellence.</span>
                        </h2>
                        <p className="font-body text-base lg:text-lg leading-relaxed opacity-80 max-w-md">
                            We function as the meticulous bridge between raw Nigerian potential and the structured demands of the global athletic stage.
                        </p>
                    </motion.div>
                </div>

                {/* Right: The Process (Grid List) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-1 border-b-hard last:border-b-0 p-8 md:p-12 lg:p-16 group hover:bg-white transition-colors duration-500"
                        >
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-16 items-start">
                                <span className="font-display text-2xl lg:text-4xl text-primary/40 group-hover:text-primary transition-colors">
                                    / {v.id}
                                </span>
                                <div>
                                    <h3 className="font-display text-2xl lg:text-3xl uppercase tracking-tight mb-2 lg:mb-4">{v.title}</h3>
                                    <p className="font-body text-xs lg:text-sm uppercase tracking-wide opacity-60 max-w-sm lg:max-w-md leading-relaxed">
                                        {v.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
