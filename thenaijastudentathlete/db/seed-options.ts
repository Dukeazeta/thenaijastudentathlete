// Load environment variables first
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from './index';
import { options } from './schema';

const INITIAL_SPORTS = [
    "Track and Field",
    "Basketball",
    "Football",
    "Swimming",
    "Tennis",
    "Volleyball",
    "Athletics",
];

const INITIAL_SCHOOLS = [
    "University of Lagos",
    "University of Ibadan",
    "Obafemi Awolowo University",
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Federal University of Petroleum Resources",
    "Covenant University",
    "Lagos State University",
];

const INITIAL_MAJORS = [
    "Engineering",
    "Computer Science",
    "Business Administration",
    "Medicine",
    "Law",
    "Economics",
    "Accounting",
    "Mass Communication",
];

async function seed() {
    console.log("🌱 Seeding options...");

    // Check if options already exist
    const existing = await db.query.options.findMany();
    if (existing.length > 0) {
        console.log("Options already seeded, skipping...");
        return;
    }

    // Seed sports
    for (const value of INITIAL_SPORTS) {
        await db.insert(options).values({ category: "sport", value });
    }
    console.log(`✓ Seeded ${INITIAL_SPORTS.length} sports`);

    // Seed schools
    for (const value of INITIAL_SCHOOLS) {
        await db.insert(options).values({ category: "school", value });
    }
    console.log(`✓ Seeded ${INITIAL_SCHOOLS.length} schools`);

    // Seed majors
    for (const value of INITIAL_MAJORS) {
        await db.insert(options).values({ category: "major", value });
    }
    console.log(`✓ Seeded ${INITIAL_MAJORS.length} majors`);

    console.log("🎉 Seeding complete!");
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
