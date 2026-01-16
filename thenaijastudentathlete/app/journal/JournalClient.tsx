"use client";

import { motion } from "framer-motion";
import type { Post } from "@/db/schema";

interface JournalClientProps {
    posts: Post[];
}

export function JournalClient({ posts }: JournalClientProps) {
    if (posts.length === 0) {
        return (
            <section className="p-12 text-center">
                <p className="font-body text-sm uppercase tracking-widest opacity-40 mb-2">
                    No journal entries yet
                </p>
                <p className="font-body text-xs opacity-30">
                    Add posts via the admin panel
                </p>
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-12">
                {posts.map((item, i) => {
                    // Parse tags from JSON string
                    let tags: string[] = [];
                    try {
                        tags = JSON.parse(item.tags || "[]");
                    } catch {
                        tags = [];
                    }

                    return (
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
                                    {tags.map(tag => (
                                        <span key={tag} className="font-body text-[10px] uppercase tracking-widest border border-black/10 px-2 py-1 opacity-50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="font-display text-xl lg:text-2xl group-hover:translate-x-2 transition-transform">Read →</span>
                            </div>

                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
}
