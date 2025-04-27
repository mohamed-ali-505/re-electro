"use client"

import type React from "react"
import { useState, useMemo, useEffect, useRef } from "react"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import Header from "../components/Header"

interface Client {
  _id: string
  name: string
  specialization: string
  discountPercentage: number
  pointsRequired: number
  type: string
}

export default function PointsPage() {
  const [email, setEmail] = useState("")
  const [points, setPoints] = useState(0)
  const [showPoints, setShowPoints] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [otpDialogOpen, setOtpDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otpSent, setOtpSent] = useState(false)
  const otpInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setOtpError(null)
    setOtp("")
    setOtpDialogOpen(true)
    setOtpSent(false)
    setShowPoints(false)
    try {
      await axios.post("/api/auth/resend-otp-points", { email })
      setOtpSent(true)
    } catch {
      setOtpError("Failed to send OTP. Please try again.")
      setOtpDialogOpen(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setOtpLoading(true)
    setOtpError(null)
    try {
      const res = await axios.post("/api/auth/verify-points", { email, otp })
      if (res.status === 200 && res.data.verified) {
        const response = await axios.get(`/api/users/points?email=${email}`)
        if (response.data.error) {
          toast.error(response.data.error)
        } else {
          setPoints(response.data.points)
          setShowPoints(true)
          setOtpDialogOpen(false)
        }
      } else {
        setOtpError("Invalid OTP. Please try again.")
      }
    } catch {
      setOtpError("Invalid OTP. Please try again.")
    } finally {
      setOtpLoading(false)
    }
  }

  const handleRedeemDiscount = async (clientId: string) => {
    if (!email) {
      toast.error('Please enter your email first')
      return
    }
    try {
      const response = await axios.post('/api/discount-redemptions', {
        discountId: clientId,
        email,
        name: email.split('@')[0]
      })

      if (response.data) {
        toast.success('Discount redemption request submitted successfully')
        // Refresh points
        const userResponse = await axios.get(`/api/users/points?email=${email}`)
        if (userResponse.data && !userResponse.data.error) {
          setPoints(userResponse.data.points)
        }
      }
    } catch (error) {
      console.error('Error redeeming discount:', error)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Failed to redeem discount')
      } else {
        toast.error('Failed to redeem discount')
      }
    }
  }

  const filteredDiscounts = useMemo(() => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, clients])

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/clients`)
      setClients(response.data)
    } catch (error) {
      console.error("Error fetching clients:", error)
      toast.error("Failed to load available discounts")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-green-700">Points & Discounts</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 border border-gray-300 shadow-md bg-white">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-green-600">Your Points</CardTitle>
                <CardDescription>Enter your Email address to see your points</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <Input
                    type="email"
                    placeholder="Enter your Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Show Points"}
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">Your current points:</p>
                  <p className="text-4xl font-bold text-green-600">{showPoints ? points : 0}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border border-gray-300 shadow-md bg-white">
              <CardHeader className="border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-green-600">Available Discounts</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription>Redeem your points for these exclusive discounts</CardDescription>
              </CardHeader>
              <CardContent>
                {isSearchOpen && (
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Search discounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-gray-300"
                    />
                  </div>
                )}
                <ScrollArea className="h-[450px]">
                  <div className="grid gap-4 pr-4">
                    {filteredDiscounts.map((client) => (
                      <Card
                        key={client._id}
                        className="flex justify-between items-center p-4 border border-gray-200 shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{client.name}</h3>
                            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {client.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{client.specialization}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">{client.discountPercentage}% off</p>
                          <p className="text-sm text-gray-600">{client.pointsRequired} points</p>
                          <Button
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium"
                            size="sm"
                            disabled={points < client.pointsRequired}
                            onClick={() => handleRedeemDiscount(client._id)}
                          >
                            Redeem
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
        {otpDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
              <h2 className="text-lg font-bold mb-2">OTP Verification</h2>
              <p className="mb-4">
                {otpSent
                  ? "Enter the OTP sent to your email."
                  : "Sending OTP..."}
              </p>
              <input
                ref={otpInputRef}
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                disabled={!otpSent}
              />
              {otpError && <p className="text-red-500">{otpError}</p>}
              <div className="flex gap-2">
                <Button onClick={handleVerifyOtp} disabled={otpLoading || !otpSent}>
                  {otpLoading ? "Verifying..." : "Verify"}
                </Button>
                <Button variant="outline" onClick={() => setOtpDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

