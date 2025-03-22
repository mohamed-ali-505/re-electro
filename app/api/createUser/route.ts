import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";  // Assuming you have a file to handle MongoDB connection
import Users from "@/models/Users";

// POST request to create a new client
export async function POST(request: Request) {
    try {
        await dbConnect();
        // Parse the incoming request body
        const { name, email, password, phone } = await request.json();

        // Validation (you can enhance this based on your requirements)
        if (!name || !email || !password || !phone) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await Users.findOne({ $or: [{ email: email }, { phone: phone }] });
        
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Connect to the database

        // Create a new client
        const newUser = new Users({
            name,
            email,
            password,
            phone,
            role: "user",
            points: 0,
        });

        // Save the client to the database
        const savedClient = await newUser.save();

        // Return the saved client as a response
        return NextResponse.json(savedClient, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
