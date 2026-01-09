"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mission as MissionComponent } from "@/components/landing/Mission";

export default function MissionPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20">
                {/* Reuse the verified Mission component as the core */}
                <MissionComponent />

                {/* Additional Manifesto Content */}
                <section className="grid grid-cols-1 lg:grid-cols-12 border-b-hard">
                    <div className="col-span-1 lg:col-span-6 p-8 lg:p-24 bg-white border-r-hard">
                        <h2 className="font-display text-4xl uppercase tracking-tight mb-8">The Nigerian <br /> Advantage</h2>
                        <p className="font-body text-lg leading-relaxed opacity-80 mb-8">
                            Nigeria possesses one of the world's most potent reservoirs of raw athletic talent. Yet, the bridge to global opportunity has historically been fragmented.
                        </p>
                        <p className="font-body text-lg leading-relaxed opacity-80">
                            TNSA was engineered to solve this fragmentation. We are not an agency; we are an infrastructure. A standardized pipeline that verifies, documents, and prepares student-athletes for the rigors of international competition and education.
                        </p>
                    </div>
                    <div className="col-span-1 lg:col-span-6 bg-surface min-h-[400px] flex items-center justify-center p-12">
                        <div className="border border-black/20 p-12 text-center">
                            <span className="font-display text-9xl text-primary opacity-20 block">NGR</span>
                            <span className="font-body text-xs uppercase tracking-widest mt-4 block">Official Federation Mandate</span>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
