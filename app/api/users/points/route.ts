import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Users from "@/models/Users"

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const email = request.nextUrl.searchParams.get("email")
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await Users.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ points: user.points })
  } catch (error) {
    console.error("Error fetching user points:", error)
    return NextResponse.json(
      { error: "Failed to fetch user points" },
      { status: 500 }
    )
  }
} 