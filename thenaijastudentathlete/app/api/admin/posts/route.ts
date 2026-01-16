import { NextResponse } from "next/server";
import { createPost, getPosts } from "@/db/queries";

export async function GET() {
    try {
        const data = await getPosts();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await createPost(body);
        return NextResponse.json(result[0]);
    } catch (error) {
        console.error("Failed to create post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
