import { NextResponse } from "next/server";
import { db, athletes } from "@/db";
import { createAthlete, getAllAthletes } from "@/db/queries";

export async function GET() {
    try {
        const data = await getAllAthletes();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch athletes:", error);
        return NextResponse.json({ error: "Failed to fetch athletes" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await createAthlete(body);
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to create athlete:", error);
        return NextResponse.json({ error: "Failed to create athlete" }, { status: 500 });
    }
}
