import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Requests from "@/models/Requests";

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
        const requests = await Requests.find()
            // .skip((page - 1) * pageSize) // Skip clients from previous pages
            // .limit(pageSize); // Limit to pageSize clients

        // if (!clients.length) {
        //     return NextResponse.json(
        //         { error: "No clients found" },
        //         { status: 404 }
        //     );
        // }

        // Return clients as JSON response
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
