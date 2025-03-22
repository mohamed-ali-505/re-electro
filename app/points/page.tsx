"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { ClientType } from "@/types"
import axios from "axios"

const discounts = [
  {
    id: 1,
    name: "إسلام جابر ماهر",
    specialization: "طب أسنان",
    discountPercentage: 25,
    pointsRequired: 500,
    type: "doctor",
  },
  {
    id: 2,
    name: "سعد محمد الحسيني",
    specialization: "طب الأطفال وحديثي الولادة",
    discountPercentage: 30,
    pointsRequired: 600,
    type: "doctor",
  },
  {
    id: 3,
    name: "محمد فتحي الزناتي",
    specialization: "باطنة - كبد - سكر",
    discountPercentage: 20,
    pointsRequired: 400,
    type: "doctor",
  },
  {
    id: 4,
    name: "محمد الخطيب",
    specialization: "جراحة العظام والكسور والعمود الفقري",
    discountPercentage: 35,
    pointsRequired: 700,
    type: "doctor",
  },
  {
    id: 5,
    name: "إلهام السيد العشري",
    specialization: "طب الأطفال وحديثي الولادة",
    discountPercentage: 15,
    pointsRequired: 300,
    type: "doctor",
  },
  {
    id: 6,
    name: "أسامة أبو السعد صقر",
    specialization: "دكتوراة التوليد وامراض النساء",
    discountPercentage: 40,
    pointsRequired: 800,
    type: "doctor",
  },
  {
    id: 7,
    name: "بيولاب",
    specialization: "جميع أنواع التحاليل",
    discountPercentage: 45,
    pointsRequired: 900,
    type: "lab",
  },
  {
    id: 8,
    name: "الفا للتحاليل الطبية",
    specialization: "جميع أنواع التحاليل",
    discountPercentage: 10,
    pointsRequired: 200,
    type: "lab",
  },
  {
    id: 9,
    name: "الرواد للتحاليل الطبية",
    specialization: "جميع أنواع التحاليل",
    discountPercentage: 50,
    pointsRequired: 1000,
    type: "lab",
  },
  {
    id: 10,
    name: "حياة لاب",
    specialization: "جميع أنواع التحاليل",
    discountPercentage: 30,
    pointsRequired: 600,
    type: "lab",
  },
]

export default function PointsPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [points, setPoints] = useState(0)
  const [showPoints, setShowPoints] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [clients, setClients] = useState<ClientType[]>([]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically verify the phone number and fetch the points from the backend
    // For now, we'll just set a random number of points
    setPoints(Math.floor(Math.random() * 1000))
    setShowPoints(true)
  }

  const filteredDiscounts = useMemo(() => {
    return clients.filter(
      (discount) =>
        discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, clients])


  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/clients`);
      // setLoading(false);
      setClients(response.data);
    } catch {
      // setLoading(false);
    }
  };

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
                <CardDescription>Enter your phone number to see your points</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-gray-300"
                  />
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium">
                    Show Points
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
                    {filteredDiscounts.map((discount) => (
                      <Card
                        key={discount.id}
                        className="flex justify-between items-center p-4 border border-gray-200 shadow-sm"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{discount.name}</h3>
                            <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {discount.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{discount.specialization}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600">{discount.discountPercentage}% off</p>
                          <p className="text-sm text-gray-600">{discount.pointsRequired} points</p>
                          <Button
                            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium"
                            size="sm"
                            disabled={points < discount.pointsRequired}
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
      </main>
      <Footer />
    </div>
  )
}

