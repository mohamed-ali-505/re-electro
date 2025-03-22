"use client"

import type React from "react"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "../components/ImageUpload"

import axios from "axios"

export default function RecyclePage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    items: ""
  })

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

    console.log(requestData);
    

    try {
      // Send the POST request using Axios
      const response = await axios.post("/api/createRequest", requestData);

      // Handle success (you can update the UI or show a success message)
      console.log("request created:", response.data);
      alert("request created successfully!");
      setIsSubmitting(false)
      // Reset form fields after successful submission
      setFormData({
        name: "",
        phone: "",
        address: "",
        email: "",
        items: ""
      })
    } catch (error) {
      setIsSubmitting(false)
      // Handle error (you can display an error message)
      console.error("Error creating request:", error);
      alert("Failed to create requestData.");
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
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
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
              Submit Request
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

