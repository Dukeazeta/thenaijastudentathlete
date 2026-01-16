import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// ==================== ATHLETES ====================
export const athletes = sqliteTable('athletes', {
    id: text('id').primaryKey(), // TNSA-24-XXXX format
    name: text('name').notNull(),
    sport: text('sport').notNull(),
    school: text('school').notNull(),
    major: text('major'),

    // Physical stats
    age: integer('age'),
    height: text('height'), // e.g., "5'11\""
    weight: text('weight'), // e.g., "145lbs"
    graduationYear: integer('graduation_year'),

    // Academic
    gpa: text('gpa'), // e.g., "3.8/4.0"

    // Media
    imageUrl: text('image_url'),

    // Primary performance metric
    primaryMetric: text('primary_metric'), // e.g., "100m Dash"
    primaryValue: text('primary_value'),    // e.g., "11.12s"

    // Status
    status: text('status').default('active'), // active, inactive, graduated
    featured: integer('featured', { mode: 'boolean' }).default(false),

    // Timestamps
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ==================== PERFORMANCES ====================
export const performances = sqliteTable('performances', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    athleteId: text('athlete_id').notNull().references(() => athletes.id, { onDelete: 'cascade' }),

    eventName: text('event_name').notNull(),
    result: text('result').notNull(),
    eventDate: text('event_date'), // e.g., "2024-03-15"
});

// ==================== EVENTS ====================
export const events = sqliteTable('events', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    location: text('location').notNull(),
    type: text('type').notNull(), // Open, Invite Only, Federation, Webinar

    day: text('day').notNull(),   // e.g., "14"
    month: text('month').notNull(), // e.g., "February 2024"

    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ==================== POSTS (Journal) ====================
export const posts = sqliteTable('posts', {
    id: text('id').primaryKey(), // J-001 format
    title: text('title').notNull(),
    preview: text('preview').notNull(),
    content: text('content'), // Full markdown content

    category: text('category').notNull(), // Press Release, Editorial, Recruitment, Event
    tags: text('tags'), // JSON array as string: ["Policy", "Partnership"]

    date: text('date').notNull(), // e.g., "04.03.24"
    publishedAt: integer('published_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ==================== OPTIONS (Dropdown Values) ====================
export const options = sqliteTable('options', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    category: text('category').notNull(), // 'sport', 'school', 'major'
    value: text('value').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ==================== RELATIONS ====================
export const athletesRelations = relations(athletes, ({ many }) => ({
    performances: many(performances),
}));

export const performancesRelations = relations(performances, ({ one }) => ({
    athlete: one(athletes, {
        fields: [performances.athleteId],
        references: [athletes.id],
    }),
}));

// ==================== TYPES ====================
export type Athlete = typeof athletes.$inferSelect;
export type NewAthlete = typeof athletes.$inferInsert;
export type Performance = typeof performances.$inferSelect;
export type NewPerformance = typeof performances.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Option = typeof options.$inferSelect;
export type NewOption = typeof options.$inferInsert;
