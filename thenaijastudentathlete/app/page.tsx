import {
    Navbar,
    Hero,
    FeaturedAthletes,
    Mission,
    Highlights,
    Events,
    Footer,
    ScrollText,
} from "@/components/landing";
import { getFeaturedAthletes, getAllAthletes, getRecentEvents, getRecentPosts } from "@/db/queries";
import type { Athlete, Event, Post } from "@/db/schema";

export default async function Home() {
    // Fetch data from database
    let athletes: Athlete[] = [];
    let totalCount = 0;
    let events: Event[] = [];
    let posts: Post[] = [];

    try {
        // Fetch athletes
        athletes = await getFeaturedAthletes(4);
        const allAthletes = await getAllAthletes();
        totalCount = allAthletes.length;

        // If no featured athletes, show first 4 athletes as fallback
        if (athletes.length === 0 && allAthletes.length > 0) {
            athletes = allAthletes.slice(0, 4);
        }

        // Fetch events and posts
        events = await getRecentEvents(3);
        posts = await getRecentPosts(3);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }

    return (
        <main className="relative bg-background">
            <Navbar />
            <Hero />
            <ScrollText />
            <FeaturedAthletes athletes={athletes} totalCount={totalCount || 142} />
            <Mission />
            <ScrollText />
            <Highlights posts={posts} />
            <Events events={events} />
            <Footer />
        </main>
    );
}