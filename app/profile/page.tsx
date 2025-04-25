"use client"

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Pencil, Save, X } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'

interface UserData {
  name: string
  email: string
  points: number
}

interface RedemptionRequest {
  _id: string
  points: number
  amount: number
  walletType: string
  walletNumber: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
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
  const [walletInfo, setWalletInfo] = useState({
    walletType: '',
    walletNumber: '',
    message: ''
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [redemptionHistory, setRedemptionHistory] = useState<RedemptionRequest[]>([])

  useEffect(() => {
    fetchUserData()
    fetchRedemptionHistory()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users')
      if (response.data && response.data.length > 0) {
        setUserData(response.data[0])
        setEditedName(response.data[0].name)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to load user data')
    }
  }

  const fetchRedemptionHistory = async () => {
    try {
      const response = await axios.get('/api/redemptions')
      setRedemptionHistory(response.data)
    } catch (error) {
      console.error('Error fetching redemption history:', error)
      toast.error('Failed to load redemption history')
    }
  }

  const handleNameUpdate = async () => {
    try {
      await axios.patch('/api/users', { name: editedName })
      setUserData(prev => ({ ...prev, name: editedName }))
      setIsEditingName(false)
      toast.success('Name updated successfully')
    } catch (error) {
      console.error('Error updating name:', error)
      toast.error('Failed to update name')
    }

  }

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

    if (!walletInfo.walletType || !walletInfo.walletNumber) {
      toast.error('Please provide wallet information')
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post('/api/redemptions', {
        points: redeemAmount * 10,
        amount: redeemAmount,
        walletType: walletInfo.walletType,
        walletNumber: walletInfo.walletNumber,
        message: walletInfo.message,
        email: userData.email,
        name: userData.name
      })

      if (response.data) {
        toast.success('Redemption request submitted successfully')
        setSliderValue([0])
        setPointsInput('')
        setPoundsInput('')
        setWalletInfo({
          walletType: '',
          walletNumber: '',
          message: ''
        })
        fetchRedemptionHistory()
      }
    } catch (error: unknown) {
      console.error('Error submitting redemption request:', error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Failed to submit redemption request')
      } else {
        toast.error('Failed to submit redemption request')
      }
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'approved':
        return <Badge variant="default">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - User Info and Redemption Form */}
            <div className="space-y-6">
              {/* User Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-muted-foreground">Name</Label>
                      {isEditingName ? (
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-64"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleNameUpdate}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setIsEditingName(false)
                              setEditedName(userData.name)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-lg">{userData.name}</p>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsEditingName(true)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="text-lg mt-1">{userData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Points Balance</Label>
                    <p className="text-lg mt-1">{userData.points}</p>
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

                  {/* Wallet Information */}
                  <div className="space-y-4">
                    <div>
                      <Label>Wallet Type</Label>
                      <select
                        value={walletInfo.walletType}
                        onChange={(e) => setWalletInfo(prev => ({ ...prev, walletType: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                        required
                      >
                        <option value="">Select wallet type</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="instapay">Instapay</option>
                      </select>
                    </div>
                    <div>
                      <Label>Wallet Number</Label>
                      <Input
                        type="text"
                        value={walletInfo.walletNumber}
                        onChange={(e) => setWalletInfo(prev => ({ ...prev, walletNumber: e.target.value }))}
                        placeholder="Enter wallet number"
                        required
                      />
                    </div>
                    <div>
                      <Label>Additional Message (Optional)</Label>
                      <Input
                        type="text"
                        value={walletInfo.message}
                        onChange={(e) => setWalletInfo(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Any additional information"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Redemption History */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Redemption History</CardTitle>
                  <CardDescription>Your recent redemption requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {redemptionHistory.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No redemption requests yet</p>
                    ) : (
                      redemptionHistory.map((request) => (
                        <div key={request._id} className="border-b pb-4 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">£{request.amount} ({request.points} points)</p>
                              <p className="text-sm text-muted-foreground">
                                {request.walletType} - {request.walletNumber}
                              </p>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>
                          {request.message && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Note: {request.message}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Requested on {formatDate(request.createdAt)}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

