import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import RedemptionRequest from "@/models/RedemptionRequests"
import Users from "@/models/Users"

export async function GET() {
  try {
    await dbConnect()
    const requests = await RedemptionRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching redemption requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch redemption requests" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { points, amount, walletType, walletNumber, message, email, name } = await request.json()
    
    // Get or create the user
    let user = await Users.findOne({ email })
    
    if (!user) {
      // Create new guest user if not found
      user = new Users({
        name,
        email,
        role: "guest",
        password: "guest",
        points: 0,
      })
      await user.save()
    }

    // Check if user has enough points
    if (user.points < points) {
      return NextResponse.json({ error: 'Not enough points' }, { status: 400 })
    }

    // Create redemption request
    const redemptionRequest = await RedemptionRequest.create({
      userId: user._id,
      points,
      amount,
      walletType,
      walletNumber,
      message,
      status: 'pending'
    })

    return NextResponse.json(redemptionRequest)
  } catch (error) {
    console.error("Error creating redemption request:", error)
    return NextResponse.json(
      { error: "Failed to create redemption request" },
      { status: 500 }
    )
  }
} 