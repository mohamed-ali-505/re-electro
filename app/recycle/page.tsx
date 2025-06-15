"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "../components/ImageUpload"

import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/lib/AuthProvider"

interface UserData {
  name: string
  email: string
  points: number
  phone: string
}

export default function RecyclePage() {
  const [userData, setUserData] = useState<UserData>()
  const [imageFile, setImageFile] = useState<File | null>(null)
  console.log(imageFile)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    items: ""
  })
  const context = useAuth()

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/users/' + context?.session?.id)
      setUserData(response.data)
      setFormData((prev) => ({
        ...prev,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone
      }))

    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to load user data')
    }
  }

  useEffect(() => {
    if (context?.session) {
      fetchUserData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form default submit action
    setIsSubmitting(true);  // Show loading state
    // Prepare the data to be sent in the POST request
    const requestData = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
      items: formData.items
    };

    try {
      // Send the POST request using Axios
      await axios.post("/api/createRequest", requestData);

      toast.success("Request created successfully!")
      setIsSubmitting(false)

      // Reset form fields after successful submission
      if (context?.session && userData) {
        setFormData((prev) => ({
          ...prev,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: "",
          items: ""
        }))
      } else {
        setFormData({
          name: "",
          phone: "",
          address: "",
          email: "",
          items: ""
        })
      }

    } catch {
      setIsSubmitting(false)
      toast.error("Failed to create requestData.")
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Recycling Request</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || userData?.name}
                disabled={!!userData?.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email || userData?.email}
                onChange={handleChange}
                disabled={!!userData?.email}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || userData?.phone}
                disabled={!!userData?.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="items">Items to be recycled</Label>
              <div className="flex gap-4">
                <Textarea
                  id="items"
                  name="items"
                  required
                  value={formData.items}
                  onChange={handleChange}
                  className="flex-grow h-24"
                />
                <div className="w-1/3">
                  <ImageUpload onImageUpload={setImageFile} />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

