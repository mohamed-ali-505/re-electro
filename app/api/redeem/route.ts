import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Users from '@/models/Users'
import Points from '@/models/Points'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { points, amount } = await request.json()

    // Get the current user (you might want to add authentication here)
    const user = await Users.findOne({})
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has enough points
    if (user.points < points) {
      return NextResponse.json({ error: 'Not enough points' }, { status: 400 })
    }

    // Update user's points
    user.points -= points
    await user.save()

    // Create a points redemption record
    await Points.create({
      userId: user._id,
      points: -points, // Negative points for redemption
      type: 'redemption',
      description: `Redeemed ${amount} pounds`,
      status: 'completed'
    })

    return NextResponse.json({ 
      success: true,
      message: 'Points redeemed successfully',
      newBalance: user.points
    })
  } catch (error) {
    console.error('Error redeeming points:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 