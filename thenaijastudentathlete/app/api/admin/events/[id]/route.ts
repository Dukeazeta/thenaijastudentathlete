import { NextRequest, NextResponse } from "next/server";
import { updateEvent, deleteEvent } from "@/db/queries";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const result = await updateEvent(parseInt(id), body);
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to update event:", error);
        return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await deleteEvent(parseInt(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete event:", error);
        return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
    }
}
