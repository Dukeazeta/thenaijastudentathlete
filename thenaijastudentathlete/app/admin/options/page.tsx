"use client";

import { useState, useEffect } from "react";

interface Option {
    id: number;
    category: string;
    value: string;
}

const CATEGORIES = [
    { key: "sport", label: "Sports" },
    { key: "school", label: "Schools" },
    { key: "major", label: "Majors" },
];

export default function OptionsAdminPage() {
    const [options, setOptions] = useState<Option[]>([]);
    const [activeCategory, setActiveCategory] = useState("sport");
    const [newValue, setNewValue] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const res = await fetch("/api/admin/options");
            if (res.ok) {
                const data = await res.json();
                setOptions(data);
            }
        } catch (error) {
            console.error("Failed to fetch options:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newValue.trim()) return;

        try {
            const res = await fetch("/api/admin/options", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: activeCategory, value: newValue.trim() }),
            });

            if (res.ok) {
                fetchOptions();
                setNewValue("");
            }
        } catch (error) {
            console.error("Failed to add option:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this option?")) return;

        try {
            const res = await fetch(`/api/admin/options/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchOptions();
            }
        } catch (error) {
            console.error("Failed to delete option:", error);
        }
    };

    const filteredOptions = options.filter((o) => o.category === activeCategory);

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-1 md:mb-2">
                    Options
                </h1>
                <p className="font-body text-xs md:text-sm uppercase tracking-widest text-white/40">
                    Manage sports, schools, and majors
                </p>
            </div>

            {/* Category Tabs - Scrollable on mobile */}
            <div className="flex gap-2 mb-6 md:mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 font-body text-xs md:text-sm uppercase tracking-widest transition-colors ${activeCategory === cat.key
                            ? "bg-primary text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                            }`}
                    >
                        {cat.label}
                        <span className="ml-1 md:ml-2 opacity-60">
                            ({options.filter((o) => o.category === cat.key).length})
                        </span>
                    </button>
                ))}
            </div>

            {/* Add Form - Stack on mobile */}
            <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder={`Add new ${CATEGORIES.find((c) => c.key === activeCategory)?.label.slice(0, -1).toLowerCase()}...`}
                    className="flex-1 bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                />
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-primary text-white px-6 md:px-8 py-3 font-body text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    + Add
                </button>
            </form>

            {/* Options List */}
            {loading ? (
                <div className="text-center py-12 text-white/40 font-body uppercase tracking-widest">
                    Loading...
                </div>
            ) : filteredOptions.length === 0 ? (
                <div className="border border-white/10 p-8 md:p-12 text-center">
                    <p className="font-body text-xs md:text-sm uppercase tracking-widest text-white/40">
                        No {CATEGORIES.find((c) => c.key === activeCategory)?.label.toLowerCase()} added yet
                    </p>
                </div>
            ) : (
                <div className="border border-white/10">
                    {filteredOptions.map((option) => (
                        <div
                            key={option.id}
                            className="flex justify-between items-center p-3 md:p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5"
                        >
                            <span className="font-body text-sm md:text-base truncate mr-4">{option.value}</span>
                            <button
                                onClick={() => handleDelete(option.id)}
                                className="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors font-body text-xs uppercase tracking-widest px-3 py-2 border border-red-400/30 hover:bg-red-400/10"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
