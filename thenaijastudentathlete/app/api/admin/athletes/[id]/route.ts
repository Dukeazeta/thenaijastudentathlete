import { NextRequest, NextResponse } from "next/server";
import { updateAthlete, deleteAthlete, getAthleteById } from "@/db/queries";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const athlete = await getAthleteById(id);
        if (!athlete) {
            return NextResponse.json({ error: "Athlete not found" }, { status: 404 });
        }
        return NextResponse.json(athlete);
    } catch (error) {
        console.error("Failed to fetch athlete:", error);
        return NextResponse.json({ error: "Failed to fetch athlete" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await request.json();
        const result = await updateAthlete(id, body);
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to update athlete:", error);
        return NextResponse.json({ error: "Failed to update athlete" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await deleteAthlete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete athlete:", error);
        return NextResponse.json({ error: "Failed to delete athlete" }, { status: 500 });
    }
}
