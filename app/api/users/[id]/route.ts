import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";

// Function to handle GET request for a single user
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        await dbConnect();
        const user = await Users.findById(params.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching User:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}