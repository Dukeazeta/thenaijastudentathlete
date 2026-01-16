import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { getAthleteById } from "@/db/queries";
import { notFound } from "next/navigation";

export default async function AthleteProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const athlete = await getAthleteById(resolvedParams.id);

    if (!athlete) {
        notFound();
    }

    return (
        <main className="bg-background min-h-screen">
            <Navbar />

            <div className="pt-20 grid grid-cols-1 lg:grid-cols-12 min-h-screen">

                {/* Left: ID & Stats Block */}
                <aside className="col-span-1 lg:col-span-4 border-r-hard bg-surface p-6 lg:p-12 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] overflow-y-auto flex flex-col justify-between">
                    <div>
                        <div className="aspect-[3/4] bg-neutral-200 w-full mb-8 relative overflow-hidden group">
                            {athlete.imageUrl ? (
                                <img src={athlete.imageUrl} alt={athlete.name} className="w-full h-full object-cover grayscale" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center font-display text-5xl opacity-10 uppercase">
                                    Portrait
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full bg-primary text-white p-2 text-center font-body text-xs uppercase tracking-widest">
                                Status: {athlete.status || 'Active'}
                            </div>
                        </div>

                        <h1 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter leading-none mb-2">
                            {athlete.name.split(" ").map((n: string, i: number) => <span key={i} className="block">{n}</span>)}
                        </h1>
                        <p className="font-body text-sm uppercase tracking-widest opacity-60 mb-8">
                            ID: {athlete.id}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Age</span>
                                <span className="block font-display text-2xl">{athlete.age || '--'}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Height</span>
                                <span className="block font-display text-2xl">{athlete.height || '--'}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Weight</span>
                                <span className="block font-display text-2xl">{athlete.weight || '--'}</span>
                            </div>
                            <div className="border border-black/10 p-4 bg-white">
                                <span className="block font-body text-[10px] uppercase tracking-widest opacity-40">Class</span>
                                <span className="block font-display text-2xl">{athlete.graduationYear || '--'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/contact" className="w-full block text-center bg-black text-white py-4 font-display text-xl uppercase tracking-widest hover:bg-primary transition-colors">
                            Request Data
                        </Link>
                    </div>
                </aside>

                {/* Right: Performance Data */}
                <div className="col-span-1 lg:col-span-8 bg-background">

                    {/* Header Spec */}
                    <div className="border-b-hard p-6 lg:p-12 flex justify-between items-end bg-white">
                        <div>
                            <span className="font-body text-xs uppercase tracking-widest text-primary font-bold mb-2 block">Primary Discipline</span>
                            <span className="font-display text-4xl lg:text-6xl uppercase tracking-tighter">{athlete.sport}</span>
                        </div>
                        <div className="text-right">
                            <span className="font-body text-xs uppercase tracking-widest opacity-40 block mb-1">Key Stat</span>
                            <span className="font-display text-4xl lg:text-5xl text-primary">{athlete.primaryValue || '--'}</span>
                            <span className="font-body text-[10px] uppercase tracking-widest opacity-60 block">{athlete.primaryMetric || 'Metric'}</span>
                        </div>
                    </div>

                    {/* Additional Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b-hard">
                        <div className="p-6 lg:p-12 border-b-hard md:border-b-0 md:border-r-hard">
                            <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Results History</h3>
                            <ul className="space-y-4">
                                {athlete.performances && athlete.performances.length > 0 ? athlete.performances.map((h: any, i: number) => (
                                    <li key={i} className="flex justify-between border-b border-black/10 pb-2">
                                        <span className="font-body text-sm uppercase">{h.eventName}</span>
                                        <span className="font-display text-lg">{h.result}</span>
                                    </li>
                                )) : (
                                    <li className="font-body text-sm opacity-60">No recent public data available.</li>
                                )}
                            </ul>
                        </div>
                        <div className="p-6 lg:p-12 bg-surface">
                            <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Academics</h3>
                            <div className="space-y-6">
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">Institution</span>
                                    <span className="font-body text-lg">{athlete.school}</span>
                                </div>
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">GPA</span>
                                    <span className="font-body text-lg">{athlete.gpa || '--'}</span>
                                </div>
                                <div>
                                    <span className="font-body text-[10px] uppercase tracking-widest opacity-40 block">Major</span>
                                    <span className="font-body text-lg">{athlete.major || '--'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video / Media Section */}
                    <div className="p-6 lg:p-12">
                        <h3 className="font-display text-2xl uppercase tracking-tight mb-6">Visual Evidence</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-video bg-black flex items-center justify-center text-white cursor-pointer hover:bg-primary transition-colors">
                                <span className="font-display text-xl uppercase">Play Tape 01</span>
                            </div>
                            <div className="aspect-video bg-neutral-200 flex items-center justify-center text-black/20 font-display text-xl uppercase">
                                Unavailable
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <Footer />
        </main>
    );
}
