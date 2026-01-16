import { NextRequest, NextResponse } from "next/server";
import { getOptionsByCategory, getAllOptions, createOption } from "@/db/queries";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");

        if (category) {
            const options = await getOptionsByCategory(category);
            return NextResponse.json(options);
        }

        const options = await getAllOptions();
        return NextResponse.json(options);
    } catch (error) {
        console.error("Failed to fetch options:", error);
        return NextResponse.json({ error: "Failed to fetch options" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { category, value } = body;

        if (!category || !value) {
            return NextResponse.json({ error: "Category and value are required" }, { status: 400 });
        }

        const result = await createOption({ category, value });
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to create option:", error);
        return NextResponse.json({ error: "Failed to create option" }, { status: 500 });
    }
}
