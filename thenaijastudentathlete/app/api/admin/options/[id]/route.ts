import { NextRequest, NextResponse } from "next/server";
import { deleteOption } from "@/db/queries";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await deleteOption(parseInt(id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete option:", error);
        return NextResponse.json({ error: "Failed to delete option" }, { status: 500 });
    }
}
