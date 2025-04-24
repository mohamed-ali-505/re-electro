"use client"

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import axios from 'axios'
import { toast } from 'sonner'

interface UserData {
  name: string
  email: string
  points: number
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    points: 0
  })
  const [sliderValue, setSliderValue] = useState([0])
  const [isLoading, setIsLoading] = useState(false)
  const [pointsInput, setPointsInput] = useState('')
  const [poundsInput, setPoundsInput] = useState('')

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users')
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]) // Assuming first user is the current user
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        toast.error('Failed to load user data')
      }
    }
    fetchUserData()
  }, [])

  const handleRedeem = async () => {
    const redeemAmount = sliderValue[0]
    if (redeemAmount <= 0) {
      toast.error('Please select an amount to redeem')
      return
    }

    if (redeemAmount * 10 > userData.points) {
      toast.error('Not enough points')
      return
    }

    setIsLoading(true)
    try {
      await axios.post('/api/redeem', {
        points: redeemAmount * 10, // 10 points per pound
        amount: redeemAmount
      })
      toast.success(`Successfully redeemed ${redeemAmount} pounds`)
      setUserData(prev => ({
        ...prev,
        points: prev.points - (redeemAmount * 10)
      }))
      setSliderValue([0])
      setPointsInput('')
      setPoundsInput('')
    } catch (error) {
      console.error('Error redeeming points:', error)
      toast.error('Failed to redeem points')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePointsChange = (value: string) => {
    const points = parseInt(value) || 0
    setPointsInput(value)
    const pounds = Math.floor(points / 10)
    setPoundsInput(pounds.toString())
    setSliderValue([pounds])
  }

  const handlePoundsChange = (value: string) => {
    const pounds = parseInt(value) || 0
    setPoundsInput(value)
    const points = pounds * 10
    setPointsInput(points.toString())
    setSliderValue([pounds])
  }

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    const pounds = value[0]
    setPoundsInput(pounds.toString())
    setPointsInput((pounds * 10).toString())
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="grid gap-6">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={userData.name} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={userData.email} disabled />
                </div>
                <div>
                  <Label>Points Balance</Label>
                  <Input value={userData.points} disabled />
                </div>
              </CardContent>
            </Card>

            {/* Points Redemption Card */}
            <Card>
              <CardHeader>
                <CardTitle>Redeem Points</CardTitle>
                <CardDescription>Convert your points to pounds (10 points = 1 pound)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Points</Label>
                    <Input
                      type="number"
                      value={pointsInput}
                      onChange={(e) => handlePointsChange(e.target.value)}
                      placeholder="Enter points"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label>Pounds</Label>
                    <Input
                      type="number"
                      value={poundsInput}
                      onChange={(e) => handlePoundsChange(e.target.value)}
                      placeholder="Enter pounds"
                      min="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Amount to Redeem (in pounds)</Label>
                  <div className="px-4 py-2">
                    <Slider
                      value={sliderValue}
                      onValueChange={handleSliderChange}
                      max={100}
                      step={1}
                      min={0}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0 pounds</span>
                    <span>100 pounds</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Points to be used: {sliderValue[0] * 10}</p>
                    <p className="text-sm text-gray-500">You will receive: {sliderValue[0]} pounds</p>
                  </div>
                  <Button 
                    onClick={handleRedeem}
                    disabled={isLoading || sliderValue[0] <= 0 || sliderValue[0] * 10 > userData.points}
                  >
                    {isLoading ? 'Processing...' : 'Redeem'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

