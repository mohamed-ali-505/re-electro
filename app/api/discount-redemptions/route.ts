import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import DiscountRedemption from "../../../models/DiscountRedemption"
import Users from "../../../models/Users"
import Client from "../../../models/Clients"

export async function GET() {
  try {
    await dbConnect()
    const requests = await DiscountRedemption.find()
      .populate('userId', 'name email phoneNumber points')
      .populate('discountId')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching discount redemption requests:", error)
    return NextResponse.json(
      { error: "Failed to fetch discount redemption requests" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { discountId, email, name } = await request.json()
    
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

    // Get the discount (client)
    const discount = await Client.findById(discountId)
    if (!discount) {
      return NextResponse.json({ error: 'Discount not found' }, { status: 404 })
    }

    // Check if user has enough points
    if (user.points < discount.pointsRequired) {
      return NextResponse.json({ error: 'Not enough points' }, { status: 400 })
    }

    // Create discount redemption request
    const redemptionRequest = await DiscountRedemption.create({
      userId: user._id,
      discountId: discount._id,
      points: discount.pointsRequired,
      status: 'pending'
    })

    return NextResponse.json(redemptionRequest)
  } catch (error) {
    console.error("Error creating discount redemption request:", error)
    return NextResponse.json(
      { error: "Failed to create discount redemption request" },
      { status: 500 }
    )
  }
} 