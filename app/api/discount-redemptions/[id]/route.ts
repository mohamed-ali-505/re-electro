import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import DiscountRedemption from "@/models/DiscountRedemption"
import Users from "@/models/Users"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const { status } = await request.json()
    
    const redemptionRequest = await DiscountRedemption.findById(params.id)
    if (!redemptionRequest) {
      return NextResponse.json(
        { error: "Discount redemption request not found" },
        { status: 404 }
      )
    }

    const user = await Users.findById(redemptionRequest.userId)
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // If status is being changed to approved, deduct points from user
    if (status === "approved" && redemptionRequest.status === "pending") {
      if (user.points < redemptionRequest.points) {
        return NextResponse.json(
          { error: "User does not have enough points" },
          { status: 400 }
        )
      }
      user.points -= redemptionRequest.points
      await user.save()
    }

    // If status is being changed to rejected and was pending, return points to user
    if (status === "rejected" && redemptionRequest.status === "pending") {
      user.points += redemptionRequest.points
      await user.save()
    }

    // Update redemption request status
    redemptionRequest.status = status
    await redemptionRequest.save()

    return NextResponse.json(redemptionRequest)
  } catch (error) {
    console.error("Error updating discount redemption request:", error)
    return NextResponse.json(
      { error: "Failed to update discount redemption request" },
      { status: 500 }
    )
  }
} 