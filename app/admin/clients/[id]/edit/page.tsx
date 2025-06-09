"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { clientsTypes } from "@/models/Clients"
import { toast } from "sonner"

interface EditClientPageProps {
  params: {
    id: string
  }
}

export default function EditClientPage({ params }: EditClientPageProps) {
  const router = useRouter()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    discountPercentage: 0,
    pointsRequired: 0,
    type: ""
  })

  useEffect(() => {
    const fetchClientData = async () => {
      setIsLoading(true)
      try {
        console.log("Fetching client data for ID:", id)
        const response = await axios.get(`/api/clients/${id}`)
        const clientData = response.data
        console.log("Received client data:", clientData)
        
        if (!clientData) {
          toast.error("Client not found")
          router.push("/admin/clients")
          return
        }

        setFormData({
          name: clientData.name || "",
          specialization: clientData.specialization || "",
          discountPercentage: clientData.discountPercentage || 0,
          pointsRequired: clientData.pointsRequired || 0,
          type: clientData.type || ""
        })
      } catch (error) {
        console.error("Error fetching client data:", error)
        toast.error("Failed to load client data")
        router.push("/admin/clients")
      } finally {
        setIsLoading(false)
      }
    }

    fetchClientData()
  }, [id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("Submitting form data:", formData)
      const response = await axios.put(`/api/clients/${id}`, formData)
      console.log("Update response:", response.data)
      
      if (response.data) {
        toast.success("Client updated successfully!")
      router.push("/admin/clients")
      } else {
        throw new Error("No data received from server")
      }
    } catch (error) {
      console.error("Error updating client:", error)
      toast.error("Failed to update client")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Client</h1>
          <p className="text-muted-foreground">Update client information.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/clients" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Link>
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Update the details of the client.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountPercentage">Discount Percentage</Label>
                <Input
                  id="discountPercentage"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pointsRequired">Points Required</Label>
                <Input
                  id="pointsRequired"
                  name="pointsRequired"
                  value={formData.pointsRequired}
                  onChange={handleChange}
                  type="number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Client Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientsTypes.map((type) => (
                      <SelectItem value={type} key={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/admin/clients")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Client"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

