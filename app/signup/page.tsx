"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export default function CorporateSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent form default submit action
    setIsSubmitting(true);  // Show loading state
    // Prepare the data to be sent in the POST user
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    };

    try {
      // Send the POST user using Axios
      const response = await axios.post("/api/createUser", userData);

      // Handle success (you can update the UI or show a success message)
      console.log("user created:", response.data);
      toast.success("user created successfully!");
      setIsSubmitting(false)
      // Reset form fields after successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        password: ""
      })
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || "An unknown error occurred";
        toast.error(errorMessage.toString());
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Corporate Account</CardTitle>
            <CardDescription>
              Join our network of sustainable businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/corporate/login" className="text-green-600 hover:text-green-500">
                Sign in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

