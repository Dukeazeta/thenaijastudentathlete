import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "700"],
  style: ["italic"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "TheNaijaStudentAthlete | GRIT & GLORY",
  description: "A Brutalist Editorial showcase of Nigeria's rising athletic stars. Power. Precision. Pride.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${outfit.variable} ${cormorant.variable} ${spaceGrotesk.variable} antialiased selection:bg-primary selection:text-black`}
      >
        {/* Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] noise-background" />

        {/* Scanline Effect */}
        <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.02] scanlines" />

        <div className="relative min-h-screen bg-background">
          {children}

          {/* Clean Overlay System */}
          <div className="fixed inset-0 pointer-events-none noise-background opacity-[0.03] z-[999]" />
        </div>
      </body>
    </html>
  );
}
