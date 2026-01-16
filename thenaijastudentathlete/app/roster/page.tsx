import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getAllAthletes } from "@/db/queries";
import { RosterClient } from "./RosterClient";

export default async function RosterPage() {
    let athletes: any[] = [];

    try {
        athletes = await getAllAthletes();
    } catch (error) {
        console.error("Failed to fetch athletes:", error);
    }

    // Extract unique sports and statuses for filters
    const sports = ["All", ...new Set(athletes.map(a => a.sport).filter(Boolean))];
    const statuses = ["All", ...new Set(athletes.map(a => a.status || "active").filter(Boolean))];

    return (
        <main className="bg-background min-h-screen">
            <Navbar />
            <RosterClient
                athletes={athletes}
                sports={sports}
                statuses={statuses}
            />
            <Footer />
        </main>
    );
}
