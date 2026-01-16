import { db } from './index';
import { athletes, performances, events, posts, options } from './schema';
import { eq, desc, and } from 'drizzle-orm';
import type { Athlete, Event, Post, Option } from './schema';

// ==================== ATHLETES ====================

export async function getAthletes(options?: {
    featured?: boolean;
    sport?: string;
    limit?: number;
}) {
    const conditions = [];

    if (options?.featured !== undefined) {
        conditions.push(eq(athletes.featured, options.featured));
    }
    if (options?.sport) {
        conditions.push(eq(athletes.sport, options.sport));
    }

    const query = db.query.athletes.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        with: {
            performances: true,
        },
        orderBy: [desc(athletes.createdAt)],
        limit: options?.limit,
    });

    return query;
}

export async function getFeaturedAthletes(limit = 4) {
    return getAthletes({ featured: true, limit });
}

export async function getAthleteById(id: string) {
    return db.query.athletes.findFirst({
        where: eq(athletes.id, id),
        with: {
            performances: true,
        },
    });
}

export async function getAllAthletes() {
    return db.query.athletes.findMany({
        orderBy: [desc(athletes.createdAt)],
    });
}

// ==================== EVENTS ====================

export async function getEvents() {
    const allEvents = await db.query.events.findMany({
        orderBy: [desc(events.createdAt)],
    });

    // Group by month
    const grouped = allEvents.reduce((acc, event) => {
        const month = event.month;
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    // Convert to array format
    return Object.entries(grouped).map(([name, events]) => ({
        name,
        events,
    }));
}

export async function getAllEvents() {
    return db.query.events.findMany({
        orderBy: [desc(events.createdAt)],
    });
}

export async function getRecentEvents(limit = 3) {
    return db.query.events.findMany({
        orderBy: [desc(events.createdAt)],
        limit,
    });
}

// ==================== POSTS ====================

export async function getPosts(limit?: number) {
    return db.query.posts.findMany({
        orderBy: [desc(posts.publishedAt)],
        limit,
    });
}

export async function getRecentPosts(limit = 3) {
    return getPosts(limit);
}

export async function getPostById(id: string) {
    return db.query.posts.findFirst({
        where: eq(posts.id, id),
    });
}

// ==================== ADMIN CRUD ====================

// Athletes
export async function createAthlete(data: typeof athletes.$inferInsert) {
    return db.insert(athletes).values(data).returning();
}

export async function updateAthlete(id: string, data: Partial<typeof athletes.$inferInsert>) {
    return db.update(athletes).set({ ...data, updatedAt: new Date() }).where(eq(athletes.id, id)).returning();
}

export async function deleteAthlete(id: string) {
    return db.delete(athletes).where(eq(athletes.id, id));
}

// Performances
export async function createPerformance(data: typeof performances.$inferInsert) {
    return db.insert(performances).values(data).returning();
}

export async function deletePerformance(id: number) {
    return db.delete(performances).where(eq(performances.id, id));
}

// Events
export async function createEvent(data: typeof events.$inferInsert) {
    return db.insert(events).values(data).returning();
}

export async function updateEvent(id: number, data: Partial<typeof events.$inferInsert>) {
    return db.update(events).set(data).where(eq(events.id, id)).returning();
}

export async function deleteEvent(id: number) {
    return db.delete(events).where(eq(events.id, id));
}

// Posts
export async function createPost(data: typeof posts.$inferInsert) {
    return db.insert(posts).values(data).returning();
}

export async function updatePost(id: string, data: Partial<typeof posts.$inferInsert>) {
    return db.update(posts).set(data).where(eq(posts.id, id)).returning();
}

export async function deletePost(id: string) {
    return db.delete(posts).where(eq(posts.id, id));
}

// Options (Dropdown Values)
export async function getOptionsByCategory(category: string) {
    return db.query.options.findMany({
        where: eq(options.category, category),
        orderBy: [desc(options.createdAt)],
    });
}

export async function getAllOptions() {
    return db.query.options.findMany({
        orderBy: [desc(options.createdAt)],
    });
}

export async function createOption(data: typeof options.$inferInsert) {
    return db.insert(options).values(data).returning();
}

export async function deleteOption(id: number) {
    return db.delete(options).where(eq(options.id, id));
}
