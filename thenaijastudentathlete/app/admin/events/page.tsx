"use client";

import { useState, useEffect } from "react";

interface Event {
    id: number;
    title: string;
    location: string;
    type: string;
    day: string;
    month: string;
}

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        location: "",
        type: "Open",
        day: "",
        month: "",
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch("/api/admin/events");
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (error) {
            console.error("Failed to fetch events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `/api/admin/events/${editingId}`
            : "/api/admin/events";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                fetchEvents();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to save event:", error);
        }
    };

    const handleEdit = (event: Event) => {
        setForm({
            title: event.title,
            location: event.location,
            type: event.type,
            day: event.day,
            month: event.month,
        });
        setEditingId(event.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this event?")) return;

        try {
            const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchEvents();
            }
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    const resetForm = () => {
        setForm({ title: "", location: "", type: "Open", day: "", month: "" });
        setEditingId(null);
        setShowForm(false);
    };

    const eventTypes = ["Open", "Invite Only", "Federation", "Webinar"];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="font-display text-5xl uppercase tracking-tighter mb-2">
                        Events
                    </h1>
                    <p className="font-body text-sm uppercase tracking-widest text-white/40">
                        Manage schedule & calendar
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary text-white px-6 py-3 font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    {showForm ? "Cancel" : "+ Add Event"}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="border border-white/10 p-6 mb-8 bg-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Title *
                            </label>
                            <input
                                required
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="National Prep Combine"
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Location *
                            </label>
                            <input
                                required
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                                placeholder="Lagoon Stadium, Lagos"
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Day *
                            </label>
                            <input
                                required
                                value={form.day}
                                onChange={(e) => setForm({ ...form, day: e.target.value })}
                                placeholder="14"
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Month *
                            </label>
                            <input
                                required
                                value={form.month}
                                onChange={(e) => setForm({ ...form, month: e.target.value })}
                                placeholder="February 2024"
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Type *
                            </label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            >
                                {eventTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                        >
                            {editingId ? "Update" : "Create"} Event
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="border border-white/20 text-white px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
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
            ) : events.length === 0 ? (
                <div className="border border-white/10 p-12 text-center">
                    <p className="font-body text-sm uppercase tracking-widest text-white/40 mb-4">
                        No events scheduled
                    </p>
                </div>
            ) : (
                <div className="border border-white/10 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Date</th>
                                <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Title</th>
                                <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Location</th>
                                <th className="text-left p-4 font-body text-xs uppercase tracking-widest text-white/40">Type</th>
                                <th className="text-right p-4 font-body text-xs uppercase tracking-widest text-white/40">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {events.map((event) => (
                                <tr key={event.id} className="hover:bg-white/5">
                                    <td className="p-4 font-display text-xl text-primary">{event.day} {event.month}</td>
                                    <td className="p-4 font-body">{event.title}</td>
                                    <td className="p-4 font-body text-white/60">{event.location}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs uppercase tracking-widest ${event.type === 'Open' ? 'border border-primary text-primary' : 'border border-white/20 text-white/60'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="text-primary hover:text-white transition-colors mr-4 font-body text-xs uppercase tracking-widest"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
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
            )}
        </div>
    );
}
