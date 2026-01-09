"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function ContactPage() {
    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

                {/* Left: Contact Info */}
                <div className="bg-primary text-white p-8 lg:p-24 flex flex-col justify-between border-b-hard lg:border-r-hard lg:border-b-0">
                    <div>
                        <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter mb-8 lg:mb-12">Inquiry <br /> Desk</h1>
                        <p className="font-body text-base lg:text-lg opacity-80 max-w-md leading-relaxed mb-12">
                            For official correspondence regarding athlete verification, scholarship partnerships, or federation compliance.
                        </p>
                    </div>

                    <div className="space-y-8 font-body text-sm uppercase tracking-widest">
                        <div>
                            <span className="opacity-50 block mb-2">HQ Location</span>
                            <p>Lagos State Sports Commission Complex,<br />Surulere, Lagos, NG.</p>
                        </div>
                        <div>
                            <span className="opacity-50 block mb-2">Digital Line</span>
                            <p>bureau@tnsa.ng</p>
                            <p>+234 810 000 0000</p>
                        </div>
                    </div>
                </div>

                {/* Right: The Form */}
                <div className="bg-background p-8 lg:p-24 flex flex-col justify-center">
                    <form className="space-y-6 max-w-lg w-full">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="font-body text-xs uppercase tracking-widest font-bold">First Name</label>
                                <input type="text" className="w-full bg-white border-2 border-black p-4 font-body text-sm outline-none focus:border-primary transition-colors rounded-none placeholder:uppercase placeholder:opacity-40" placeholder="Enter Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-body text-xs uppercase tracking-widest font-bold">Last Name</label>
                                <input type="text" className="w-full bg-white border-2 border-black p-4 font-body text-sm outline-none focus:border-primary transition-colors rounded-none placeholder:uppercase placeholder:opacity-40" placeholder="Enter Name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-widest font-bold">Official Email</label>
                            <input type="email" className="w-full bg-white border-2 border-black p-4 font-body text-sm outline-none focus:border-primary transition-colors rounded-none placeholder:uppercase placeholder:opacity-40" placeholder="name@organization.com" />
                        </div>

                        <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-widest font-bold">Topic</label>
                            <select className="w-full bg-white border-2 border-black p-4 font-body text-sm outline-none focus:border-primary transition-colors rounded-none uppercase appearance-none cursor-pointer">
                                <option>General Inquiry</option>
                                <option>Recruitment Access</option>
                                <option>Partnership Proposal</option>
                                <option>Media Request</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-widest font-bold">Message Dossier</label>
                            <textarea rows={6} className="w-full bg-white border-2 border-black p-4 font-body text-sm outline-none focus:border-primary transition-colors rounded-none placeholder:uppercase placeholder:opacity-40 resize-none" placeholder="Type your message here..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-black text-white p-6 font-display text-xl uppercase tracking-widest hover:bg-primary transition-colors duration-300">
                            Transmit Inquiry
                        </button>

                    </form>
                </div>

            </div>
            <Footer />
        </main>
    );
}
