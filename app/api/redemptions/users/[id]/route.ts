import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import RedemptionRequest from "@/models/RedemptionRequests";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        console.log("GET request for user ID:", params.id);

        // Validate user ID
        if (!params.id) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Find all redemption requests for this user
        const redemptions = await RedemptionRequest.find({ userId: params.id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'userId',
                select: 'name email'
            })
            .lean();

        // Return empty array if no redemptions found
        if (!redemptions || redemptions.length === 0) {
            return NextResponse.json([]);
        }

        console.log("Found redemptions:", redemptions);
        return NextResponse.json(redemptions);

    } catch (error: any) {
        // Detailed error logging
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        return NextResponse.json(
            { error: "Failed to fetch redemption requests", details: error.message },
            { status: 500 }
        );
    }
}
