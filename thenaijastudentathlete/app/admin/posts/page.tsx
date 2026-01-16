"use client";

import { useState, useEffect } from "react";

interface Post {
    id: string;
    title: string;
    preview: string;
    category: string;
    date: string;
    tags: string;
}

export default function PostsAdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        id: "",
        title: "",
        preview: "",
        content: "",
        category: "Editorial",
        tags: "",
        date: "",
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/posts");
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const generateId = () => {
        const num = String(posts.length + 1).padStart(3, "0");
        return `J-${num}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `/api/admin/posts/${editingId}`
            : "/api/admin/posts";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    id: form.id || generateId(),
                    tags: JSON.stringify(form.tags.split(",").map(t => t.trim()).filter(Boolean)),
                }),
            });

            if (res.ok) {
                fetchPosts();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to save post:", error);
        }
    };

    const handleEdit = (post: Post) => {
        let tagsStr = "";
        try {
            const parsed = JSON.parse(post.tags || "[]");
            tagsStr = Array.isArray(parsed) ? parsed.join(", ") : "";
        } catch {
            tagsStr = post.tags || "";
        }

        setForm({
            id: post.id,
            title: post.title,
            preview: post.preview,
            content: "",
            category: post.category,
            tags: tagsStr,
            date: post.date,
        });
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this post?")) return;

        try {
            const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    const resetForm = () => {
        setForm({ id: "", title: "", preview: "", content: "", category: "Editorial", tags: "", date: "" });
        setEditingId(null);
        setShowForm(false);
    };

    const categories = ["Press Release", "Editorial", "Recruitment", "Event"];

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="font-display text-5xl uppercase tracking-tighter mb-2">
                        Posts
                    </h1>
                    <p className="font-body text-sm uppercase tracking-widest text-white/40">
                        Manage journal entries
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary text-white px-6 py-3 font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                    {showForm ? "Cancel" : "+ New Post"}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="border border-white/10 p-6 mb-8 bg-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                ID
                            </label>
                            <input
                                value={form.id}
                                onChange={(e) => setForm({ ...form, id: e.target.value })}
                                placeholder={generateId()}
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Category *
                            </label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                                Date *
                            </label>
                            <input
                                required
                                value={form.date}
                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                placeholder="04.03.24"
                                className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                            Title *
                        </label>
                        <input
                            required
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                            Preview *
                        </label>
                        <textarea
                            required
                            rows={2}
                            value={form.preview}
                            onChange={(e) => setForm({ ...form, preview: e.target.value })}
                            className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none resize-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                            Content (Markdown)
                        </label>
                        <textarea
                            rows={8}
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full bg-black border border-white/20 text-white p-3 font-mono text-sm focus:border-primary focus:outline-none resize-none"
                            placeholder="Full article content in markdown..."
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block font-body text-xs uppercase tracking-widest text-white/40 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            value={form.tags}
                            onChange={(e) => setForm({ ...form, tags: e.target.value })}
                            placeholder="Policy, Partnership, Press"
                            className="w-full bg-black border border-white/20 text-white p-3 font-body focus:border-primary focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                        >
                            {editingId ? "Update" : "Publish"} Post
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
            ) : posts.length === 0 ? (
                <div className="border border-white/10 p-12 text-center">
                    <p className="font-body text-sm uppercase tracking-widest text-white/40 mb-4">
                        No posts published
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="border border-white/10 p-6 hover:bg-white/5 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="font-mono text-xs text-primary mr-4">{post.id}</span>
                                    <span className="font-body text-xs uppercase tracking-widest text-white/40">{post.category}</span>
                                </div>
                                <span className="font-display text-lg text-white/40">{post.date}</span>
                            </div>
                            <h3 className="font-display text-2xl uppercase tracking-tight mb-2">{post.title}</h3>
                            <p className="font-body text-sm text-white/60 mb-4">{post.preview}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                    {(() => {
                                        try {
                                            const tags = JSON.parse(post.tags || "[]");
                                            return tags.map((tag: string) => (
                                                <span key={tag} className="px-2 py-1 text-xs uppercase tracking-widest border border-white/10 text-white/40">
                                                    {tag}
                                                </span>
                                            ));
                                        } catch {
                                            return null;
                                        }
                                    })()}
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="text-primary hover:text-white transition-colors mr-4 font-body text-xs uppercase tracking-widest"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-red-400 hover:text-red-300 transition-colors font-body text-xs uppercase tracking-widest"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
