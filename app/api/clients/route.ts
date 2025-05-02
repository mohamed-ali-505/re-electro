import { NextRequest, NextResponse } from "next/server";
import Clients from "@/models/Clients";
import dbConnect from "@/lib/dbConnect";

export const dynamic = 'force-dynamic'

// Function to handle GET request
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the page query parameter from the URL
        const url = new URL(request.url);
        console.log(url);
        
        // const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1 if not specified
        // const pageSize = 10; // Limit to 10 clients per page

        // Fetch clients with pagination
        const clients = await Clients.find()
            // .skip((page - 1) * pageSize) // Skip clients from previous pages
            // .limit(pageSize); // Limit to pageSize clients

        // if (!clients.length) {
        //     return NextResponse.json(
        //         { error: "No clients found" },
        //         { status: 404 }
        //     );
        // }

        // Return clients as JSON response
        return NextResponse.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
