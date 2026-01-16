"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem("admin-auth");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin-auth", "true");
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="border border-white/20 bg-white/5 p-6 md:p-8">
                        <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tighter text-white mb-2">
                            TNSA Admin
                        </h1>
                        <p className="font-body text-xs md:text-sm text-white/60 uppercase tracking-widest mb-6 md:mb-8">
                            Authorized Access Only
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                            <div>
                                <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-white/20 text-white p-3 md:p-4 font-body text-base md:text-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Enter admin password"
                                />
                            </div>

                            {error && (
                                <p className="font-body text-sm text-red-500 uppercase tracking-widest">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 md:py-4 font-display text-lg md:text-xl uppercase tracking-tight hover:bg-white hover:text-black transition-colors"
                            >
                                Access Panel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: "◉" },
        { href: "/admin/athletes", label: "Athletes", icon: "●" },
        { href: "/admin/events", label: "Events", icon: "◆" },
        { href: "/admin/posts", label: "Posts", icon: "■" },
        { href: "/admin/options", label: "Options", icon: "▼" },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black sticky top-0 z-50">
                <Link href="/" className="block">
                    <span className="font-display text-xl uppercase tracking-tighter text-primary">
                        TNSA
                    </span>
                    <span className="font-body text-[8px] uppercase tracking-widest text-white/40 block">
                        Admin Panel
                    </span>
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-0.5 bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/80 z-40 pt-16"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <nav className="bg-black border-b border-white/10 p-4" onClick={(e) => e.stopPropagation()}>
                        <ul className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-4 font-body text-sm uppercase tracking-widest transition-colors ${isActive
                                                ? "bg-primary text-white"
                                                : "text-white/60 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <span className="text-xs">{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            onClick={() => {
                                sessionStorage.removeItem("admin-auth");
                                setIsAuthenticated(false);
                            }}
                            className="w-full mt-4 px-4 py-4 font-body text-xs uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-colors text-left border-t border-white/10"
                        >
                            ← Exit Admin
                        </button>
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 border-r border-white/10 flex-col flex-shrink-0">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="block">
                        <span className="font-display text-2xl uppercase tracking-tighter text-primary">
                            TNSA
                        </span>
                        <span className="font-body text-[10px] uppercase tracking-widest text-white/40 block">
                            Admin Panel
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 font-body text-sm uppercase tracking-widest transition-colors ${isActive
                                            ? "bg-primary text-white"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        <span className="text-xs">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("admin-auth");
                            setIsAuthenticated(false);
                        }}
                        className="w-full px-4 py-3 font-body text-xs uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                        ← Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto min-h-0">
                {children}
            </main>
        </div>
    );
}
