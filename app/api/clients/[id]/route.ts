import { NextRequest, NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";

// Function to handle GET request for a single client
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        console.log("GET request for client ID:", params.id);
        await dbConnect();
        const client = await Clients.findById(params.id);
        
        console.log("Found client:", client);
        
        if (!client) {
            console.log("Client not found");
            return NextResponse.json(
                { error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// Function to handle PUT request for updating a client
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse> {
    try {
        console.log("PUT request for client ID:", params.id);
        await dbConnect();
        const body = await request.json();
        
        console.log("Update data received:", body);
        
        const updatedClient = await Clients.findByIdAndUpdate(
            params.id,
            {
                name: body.name,
                specialization: body.specialization,
                discountPercentage: body.discountPercentage,
                pointsRequired: body.pointsRequired,
                type: body.type
            },
            { new: true }
        );

        console.log("Updated client:", updatedClient);

        if (!updatedClient) {
            console.log("Client not found for update");
            return NextResponse.json(
                { error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedClient);
    } catch (error) {
        console.error("Error updating client:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
} 