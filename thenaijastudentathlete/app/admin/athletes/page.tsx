"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Athlete {
    id: string;
    name: string;
    sport: string;
    school: string;
    major?: string;
    graduationYear?: number;
    status: string;
    featured: boolean;
    imageUrl?: string;
}

interface Option {
    id: number;
    category: string;
    value: string;
}

const currentYear = new Date().getFullYear();
const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => currentYear + i - 2);

export default function AthletesAdminPage() {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Custom input states for "Add New"
    const [showCustomSport, setShowCustomSport] = useState(false);
    const [showCustomSchool, setShowCustomSchool] = useState(false);
    const [showCustomMajor, setShowCustomMajor] = useState(false);
    const [customSport, setCustomSport] = useState("");
    const [customSchool, setCustomSchool] = useState("");
    const [customMajor, setCustomMajor] = useState("");

    // Form state
    const [form, setForm] = useState({
        id: "",
        name: "",
        sport: "",
        school: "",
        major: "",
        age: "",
        height: "",
        weight: "",
        graduationYear: "",
        gpa: "",
        primaryMetric: "",
        primaryValue: "",
        imageUrl: "",
        status: "active",
        featured: false,
    });

    useEffect(() => {
        fetchAthletes();
        fetchOptions();
    }, []);

    const fetchAthletes = async () => {
        try {
            const res = await fetch("/api/admin/athletes");
            if (res.ok) {
                const data = await res.json();
                setAthletes(data);
            }
        } catch (error) {
            console.error("Failed to fetch athletes:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOptions = async () => {
        try {
            const res = await fetch("/api/admin/options");
            if (res.ok) {
                const data = await res.json();
                setOptions(data);
            }
        } catch (error) {
            console.error("Failed to fetch options:", error);
        }
    };

    const addOption = async (category: string, value: string) => {
        try {
            const res = await fetch("/api/admin/options", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, value }),
            });
            if (res.ok) {
                await fetchOptions();
                return true;
            }
        } catch (error) {
            console.error("Failed to add option:", error);
        }
        return false;
    };

    const getSportOptions = () => options.filter(o => o.category === "sport");
    const getSchoolOptions = () => options.filter(o => o.category === "school");
    const getMajorOptions = () => options.filter(o => o.category === "major");

    const generateId = () => {
        const year = new Date().getFullYear().toString().slice(-2);
        const num = String(athletes.length + 1).padStart(4, "0");
        return `TNSA-${year}-${num}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Handle custom inputs
        if (showCustomSport && customSport) {
            await addOption("sport", customSport);
            form.sport = customSport;
        }
        if (showCustomSchool && customSchool) {
            await addOption("school", customSchool);
            form.school = customSchool;
        }
        if (showCustomMajor && customMajor) {
            await addOption("major", customMajor);
            form.major = customMajor;
        }

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `/api/admin/athletes/${editingId}`
            : "/api/admin/athletes";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    id: form.id || generateId(),
                    age: form.age ? parseInt(form.age) : null,
                    graduationYear: form.graduationYear ? parseInt(form.graduationYear) : null,
                }),
            });

            if (res.ok) {
                fetchAthletes();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to save athlete:", error);
        }
    };

    const handleEdit = (athlete: Athlete) => {
        setForm({
            id: athlete.id,
            name: athlete.name,
            sport: athlete.sport,
            school: athlete.school,
            major: athlete.major || "",
            age: "",
            height: "",
            weight: "",
            graduationYear: athlete.graduationYear?.toString() || "",
            gpa: "",
            primaryMetric: "",
            primaryValue: "",
            imageUrl: athlete.imageUrl || "",
            status: athlete.status,
            featured: athlete.featured,
        });
        setEditingId(athlete.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this athlete?")) return;

        try {
            const res = await fetch(`/api/admin/athletes/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchAthletes();
            }
        } catch (error) {
            console.error("Failed to delete athlete:", error);
        }
    };

    const resetForm = () => {
        setForm({
            id: "",
            name: "",
            sport: "",
            school: "",
            major: "",
            age: "",
            height: "",
            weight: "",
            graduationYear: "",
            gpa: "",
            primaryMetric: "",
            primaryValue: "",
            imageUrl: "",
            status: "active",
            featured: false,
        });
        setEditingId(null);
        setShowForm(false);
        setShowCustomSport(false);
        setShowCustomSchool(false);
        setShowCustomMajor(false);
        setCustomSport("");
        setCustomSchool("");
        setCustomMajor("");
    };

    const selectStyles = "w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none appearance-none cursor-pointer";
    const inputStyles = "w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none";

    return (
        <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 md:mb-8">
                <div>
                    <h1 className="font-display text-3xl md:text-5xl uppercase tracking-tighter mb-1 md:mb-2">
                        Athletes
                    </h1>
                    <p className="font-body text-xs md:text-sm uppercase tracking-widest text-white/40">
                        Manage athlete profiles
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="w-full sm:w-auto bg-primary text-white px-4 md:px-6 py-3 font-body text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    {showForm ? "Cancel" : "+ Add Athlete"}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="border border-white/10 p-4 md:p-6 mb-6 md:mb-8 bg-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                ID
                            </label>
                            <input
                                value={form.id}
                                onChange={(e) => setForm({ ...form, id: e.target.value })}
                                placeholder={generateId()}
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Name *
                            </label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Sport *
                            </label>
                            {showCustomSport ? (
                                <div className="flex gap-2">
                                    <input
                                        value={customSport}
                                        onChange={(e) => setCustomSport(e.target.value)}
                                        placeholder="Enter new sport"
                                        className={inputStyles}
                                        required
                                    />
                                    <button type="button" onClick={() => { setShowCustomSport(false); setCustomSport(""); }} className="px-3 text-white/40 hover:text-white">✕</button>
                                </div>
                            ) : (
                                <select
                                    required={!showCustomSport}
                                    value={form.sport}
                                    onChange={(e) => {
                                        if (e.target.value === "__add_new__") {
                                            setShowCustomSport(true);
                                        } else {
                                            setForm({ ...form, sport: e.target.value });
                                        }
                                    }}
                                    className={selectStyles}
                                >
                                    <option value="">Select Sport</option>
                                    {getSportOptions().map((opt) => (
                                        <option key={opt.id} value={opt.value}>{opt.value}</option>
                                    ))}
                                    <option value="__add_new__">+ Add New Sport</option>
                                </select>
                            )}
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                School *
                            </label>
                            {showCustomSchool ? (
                                <div className="flex gap-2">
                                    <input
                                        value={customSchool}
                                        onChange={(e) => setCustomSchool(e.target.value)}
                                        placeholder="Enter new school"
                                        className={inputStyles}
                                        required
                                    />
                                    <button type="button" onClick={() => { setShowCustomSchool(false); setCustomSchool(""); }} className="px-3 text-white/40 hover:text-white">✕</button>
                                </div>
                            ) : (
                                <select
                                    required={!showCustomSchool}
                                    value={form.school}
                                    onChange={(e) => {
                                        if (e.target.value === "__add_new__") {
                                            setShowCustomSchool(true);
                                        } else {
                                            setForm({ ...form, school: e.target.value });
                                        }
                                    }}
                                    className={selectStyles}
                                >
                                    <option value="">Select School</option>
                                    {getSchoolOptions().map((opt) => (
                                        <option key={opt.id} value={opt.value}>{opt.value}</option>
                                    ))}
                                    <option value="__add_new__">+ Add New School</option>
                                </select>
                            )}
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Major
                            </label>
                            {showCustomMajor ? (
                                <div className="flex gap-2">
                                    <input
                                        value={customMajor}
                                        onChange={(e) => setCustomMajor(e.target.value)}
                                        placeholder="Enter new major"
                                        className={inputStyles}
                                    />
                                    <button type="button" onClick={() => { setShowCustomMajor(false); setCustomMajor(""); }} className="px-3 text-white/40 hover:text-white">✕</button>
                                </div>
                            ) : (
                                <select
                                    value={form.major}
                                    onChange={(e) => {
                                        if (e.target.value === "__add_new__") {
                                            setShowCustomMajor(true);
                                        } else {
                                            setForm({ ...form, major: e.target.value });
                                        }
                                    }}
                                    className={selectStyles}
                                >
                                    <option value="">Select Major</option>
                                    {getMajorOptions().map((opt) => (
                                        <option key={opt.id} value={opt.value}>{opt.value}</option>
                                    ))}
                                    <option value="__add_new__">+ Add New Major</option>
                                </select>
                            )}
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                GPA
                            </label>
                            <input
                                value={form.gpa}
                                onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                                placeholder="3.8/4.0"
                                className={inputStyles}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Age
                            </label>
                            <input
                                type="number"
                                value={form.age}
                                onChange={(e) => setForm({ ...form, age: e.target.value })}
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Height
                            </label>
                            <input
                                value={form.height}
                                onChange={(e) => setForm({ ...form, height: e.target.value })}
                                placeholder={`5'11"`}
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Weight
                            </label>
                            <input
                                value={form.weight}
                                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                placeholder="145lbs"
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Grad Year
                            </label>
                            <select
                                value={form.graduationYear}
                                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                                className={selectStyles}
                            >
                                <option value="">Select Year</option>
                                {GRADUATION_YEARS.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Primary Metric
                            </label>
                            <input
                                value={form.primaryMetric}
                                onChange={(e) => setForm({ ...form, primaryMetric: e.target.value })}
                                placeholder="100m Dash"
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Primary Value
                            </label>
                            <input
                                value={form.primaryValue}
                                onChange={(e) => setForm({ ...form, primaryValue: e.target.value })}
                                placeholder="11.12s"
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Image URL
                            </label>
                            <input
                                value={form.imageUrl}
                                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                placeholder="https://..."
                                className={inputStyles}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={form.featured}
                                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                className="w-5 h-5 accent-primary"
                            />
                            <span className="font-body text-sm uppercase tracking-widest text-white/60">
                                Featured on Homepage
                            </span>
                        </label>
                        <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="graduated">Graduated</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-primary text-white px-6 md:px-8 py-3 font-body text-xs md:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                        >
                            {editingId ? "Update" : "Create"} Athlete
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="w-full sm:w-auto border border-white/20 text-white px-6 md:px-8 py-3 font-body text-xs md:text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Table */}
            {loading ? (
                <div className="text-center py-12 text-white/40 font-body uppercase tracking-widest">
                    Loading...
                </div>
            ) : athletes.length === 0 ? (
                <div className="border border-white/10 p-12 text-center">
                    <p className="font-body text-sm uppercase tracking-widest text-white/40 mb-4">
                        No athletes in database yet
                    </p>
                    <p className="font-body text-xs text-white/20">
                        Add dropdown options first via the <Link href="/admin/options" className="text-primary underline">Options</Link> page
                    </p>
                </div>
            ) : (
                <>
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {athletes.map((athlete) => (
                            <div key={athlete.id} className="border border-white/10 p-4 bg-white/5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="font-body text-base font-medium">{athlete.name}</p>
                                        <p className="font-mono text-xs text-primary">{athlete.id}</p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-widest ${athlete.status === 'active' ? 'bg-green-600/20 text-green-400' :
                                            athlete.status === 'graduated' ? 'bg-blue-600/20 text-blue-400' :
                                                'bg-white/10 text-white/40'
                                            }`}>
                                            {athlete.status}
                                        </span>
                                        {athlete.featured && (
                                            <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest bg-primary/20 text-primary">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-4 text-xs text-white/60 mb-3">
                                    <span>{athlete.sport}</span>
                                    <span>•</span>
                                    <span className="truncate">{athlete.school}</span>
                                </div>
                                <div className="flex gap-3 pt-3 border-t border-white/10">
                                    <button
                                        onClick={() => handleEdit(athlete)}
                                        className="flex-1 text-primary hover:text-white transition-colors font-body text-xs uppercase tracking-widest py-2 border border-primary/30 hover:bg-primary/10"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(athlete.id)}
                                        className="flex-1 text-red-400 hover:text-red-300 transition-colors font-body text-xs uppercase tracking-widest py-2 border border-red-400/30 hover:bg-red-400/10"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden md:block border border-white/10 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">ID</th>
                                    <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Name</th>
                                    <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Sport</th>
                                    <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">School</th>
                                    <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Status</th>
                                    <th className="text-right p-4 font-body text-xs uppercase tracking-widest text-white/40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {athletes.map((athlete) => (
                                    <tr key={athlete.id} className="hover:bg-white/5">
                                        <td className="p-4 font-mono text-sm text-primary">{athlete.id}</td>
                                        <td className="p-4 font-body">{athlete.name}</td>
                                        <td className="p-4 font-body text-white/60">{athlete.sport}</td>
                                        <td className="p-4 font-body text-white/60">{athlete.school}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs uppercase tracking-widest ${athlete.status === 'active' ? 'bg-green-600/20 text-green-400' :
                                                athlete.status === 'graduated' ? 'bg-blue-600/20 text-blue-400' :
                                                    'bg-white/10 text-white/40'
                                                }`}>
                                                {athlete.status}
                                            </span>
                                            {athlete.featured && (
                                                <span className="ml-2 px-2 py-1 text-xs uppercase tracking-widest bg-primary/20 text-primary">
                                                    Featured
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleEdit(athlete)}
                                                className="text-primary hover:text-white transition-colors mr-4 font-body text-xs uppercase tracking-widest"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(athlete.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors font-body text-xs uppercase tracking-widest"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
