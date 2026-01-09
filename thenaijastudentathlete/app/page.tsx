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

export default function Home() {
    return (
        <main className="relative bg-background">
            <Navbar />
            <Hero />
            <ScrollText />
            <FeaturedAthletes />
            <Mission />
            <ScrollText />
            <Highlights />
            <Events />
            <Footer />
        </main>
    );
}