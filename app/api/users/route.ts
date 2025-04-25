import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";

// Function to handle GET request
export async function GET(): Promise<NextResponse> {
    try {
        // Connect to the database
        await dbConnect();

        // Fetch clients with pagination
        const users = await Users.find()

        // Return clients as JSON response
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        await dbConnect();
        const { name } = await request.json();
        
        // Get the current user (you might want to add authentication here)
        const user = await Users.findOne({});
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update user's name
        user.name = name;
        await user.save();

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        );
    }
}
