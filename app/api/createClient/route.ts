import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";  // Assuming you have a file to handle MongoDB connection
import Clients from "@/models/Clients";  // Adjust the import path as needed

// POST request to create a new client
export async function POST(request: Request) {
    try {
        // Parse the incoming request body
        const { name, specialization, discountPercentage, pointsRequired, type } = await request.json();

        // Validation (you can enhance this based on your requirements)
        if (!name || !specialization || discountPercentage == null || pointsRequired == null) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Connect to the database
        await dbConnect();

        // Create a new client
        const newClient = new Clients({
            name,
            specialization,
            discountPercentage,
            pointsRequired,
            type,
            verified: false,
            otp: null,
            otpExpiry: null
        });

        // Save the client to the database
        const savedClient = await newClient.save();

        // Return the saved client as a response
        return NextResponse.json(savedClient, { status: 201 });
    } catch (error) {
        console.error("Error creating client:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
