"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll({ target: containerRef });
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section ref={containerRef} className="pt-20 min-h-screen border-b-hard bg-background overflow-hidden relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">

        {/* Left: Typographic Poster Module */}
        <div className="col-span-1 lg:col-span-7 border-r-hard bg-primary flex flex-col justify-between relative p-8 lg:p-16">

          {/* Poster Header */}
          <div className="flex justify-between items-start text-white mix-blend-screen">
            <span className="font-body text-xs uppercase tracking-[0.2em] border border-white px-2 py-1">Vol. 01 — 2026</span>
            <div className="flex flex-col text-right">
              <span className="font-display text-lg leading-none">THE NAIJA</span>
              <span className="font-display text-lg leading-none">STUDENT ATHLETE</span>
            </div>
          </div>

          {/* Massive Title */}
          <div className="relative z-10 mt-12 lg:mt-0">
            <h1 className="text-white font-display text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tighter">
              <span className="block">GRIT</span>
              <span className="block ml-[10vw] italic font-serif opacity-50 text-black mix-blend-overlay">&</span>
              <span className="block text-black mix-blend-multiply">GLORY</span>
            </h1>
          </div>

          {/* Poster Footer Info */}
          <div className="flex flex-col md:flex-row gap-8 mt-12 text-white">
            <div className="max-w-xs">
              <p className="font-body text-sm leading-relaxed opacity-90">
                The official digital dossier for Nigeria&apos;s elite collegiate prospects. Documenting the pathway from local grit to global prestige.
              </p>
            </div>
            <Link href="#roster" className="mt-auto px-8 py-4 bg-white text-primary font-display text-xl uppercase tracking-tight hover:bg-black hover:text-white transition-colors duration-300 border border-white">
              View Dossier
            </Link>
          </div>

          {/* Background Graphic */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="w-[200%] h-[200%] border-[20px] border-white rounded-[100%] absolute -top-1/2 -left-1/2" />
          </div>
        </div>

        {/* Right: Photography Module */}
        <div className="col-span-1 lg:col-span-5 relative overflow-hidden bg-black">
          <motion.div style={{ y }} className="relative w-full h-[120%]">
            <img
              src="/hero_athlete_sprint.png"
              alt="Athlete Sprint Start"
              className="w-full h-full object-cover grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-secondary mix-blend-multiply opacity-40" />
          </motion.div>

          {/* Technical Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/20 bg-black/80 backdrop-blur-sm text-white">
            <div className="grid grid-cols-2 gap-4 font-body text-[10px] uppercase tracking-widest">
              <div>
                <span className="block opacity-50">Subject</span>
                <span>Track & Field</span>
              </div>
              <div>
                <span className="block opacity-50">Location</span>
                <span>Lagos High Perf. Ctr</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
