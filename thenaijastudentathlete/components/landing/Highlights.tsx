"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Post } from "@/db/schema";

interface HighlightsProps {
  posts?: Post[];
}

// Fallback demo highlights when database is empty
const fallbackHighlights = [
  {
    id: "1",
    title: "Lagos Combine",
    category: "Scouting Report",
    date: "JAN 2026",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "2",
    title: "Ibadan Track Open",
    category: "Performance Data",
    date: "FEB 2026",
    image: "https://images.unsplash.com/photo-1461896756913-c9540802curr?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "3",
    title: "Scholarship Finals",
    category: "Placement Log",
    date: "MAR 2026",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=1200",
  },
];

export function Highlights({ posts }: HighlightsProps) {
  // Use database posts if available, otherwise fallback
  const displayHighlights = posts && posts.length > 0
    ? posts.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      date: p.date,
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1200", // Default image
    }))
    : fallbackHighlights;

  return (
    <section id="journal" className="bg-background border-b-hard py-20 px-6 lg:px-12">

      <div className="flex justify-between items-end mb-12 pb-6 border-b-hard">
        <div>
          <span className="font-body text-xs uppercase tracking-widest text-primary block mb-2">● The Archives</span>
          <h2 className="font-display text-5xl uppercase tracking-tighter">Field Reports</h2>
        </div>
        <Link href="/journal" className="hidden md:block font-body text-sm uppercase tracking-widest hover:underline">
          View All Logs →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
        {displayHighlights.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            {/* Framed Image Container */}
            <div className="aspect-[4/3] border-hard p-2 bg-white mb-6 group-hover:bg-primary transition-colors duration-300">
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={h.image}
                  alt={h.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Meta Data */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between font-body text-[10px] uppercase tracking-widest opacity-60 border-b border-black/10 pb-2 mb-2">
                <span>{h.category}</span>
                <span>Ref. {h.date}</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight group-hover:text-primary transition-colors">
                {h.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
