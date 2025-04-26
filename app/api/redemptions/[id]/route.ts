import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import RedemptionRequest from "@/models/RedemptionRequests"
import Users from "@/models/Users"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const { status } = await request.json()
    
    const redemptionRequest = await RedemptionRequest.findById(params.id)
    if (!redemptionRequest) {
      return NextResponse.json(
        { error: "Redemption request not found" },
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


    // Update redemption request status
    redemptionRequest.status = status
    await redemptionRequest.save()

    return NextResponse.json(redemptionRequest)
  } catch (error) {
    console.error("Error updating redemption request:", error)
    return NextResponse.json(
      { error: "Failed to update redemption request" },
      { status: 500 }
    )
  }
} 