import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getPosts } from "@/db/queries";
import { JournalClient } from "./JournalClient";

export default async function JournalPage() {
    let posts: any[] = [];

    try {
        posts = await getPosts();
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <main className="bg-background min-h-screen font-sans">
            <Navbar />

            <div className="pt-20 min-h-screen flex flex-col">

                {/* Header Block */}
                <section className="bg-primary text-white p-6 lg:p-24 border-b-hard">
                    <h1 className="font-display text-6xl lg:text-9xl uppercase tracking-tighter leading-none mb-6">
                        The <br />Gazette
                    </h1>
                    <div className="max-w-xl border-t border-white/20 pt-6 flex justify-between items-end">
                        <p className="font-body text-sm uppercase tracking-widest opacity-80">
                            Official Press, <br />Editorial Features, <br />& Federation Updates.
                        </p>
                        <span className="font-display text-4xl">2024</span>
                    </div>
                </section>

                {/* News List */}
                <JournalClient posts={posts} />

            </div>
            <Footer />
        </main>
    );
}
