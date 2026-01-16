import { NextResponse } from "next/server";
import { createEvent, getAllEvents } from "@/db/queries";

export async function GET() {
    try {
        const data = await getAllEvents();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await createEvent(body);
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to create event:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
