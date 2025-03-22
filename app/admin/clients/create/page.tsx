"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { clientsTypes } from "@/models/Clients"

export default function CreateClientPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        specialization: "",
        discountPercentage: 0,
        pointsRequired: 0,
        type: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    //   const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     setIsSubmitting(true)

    //     try {
    //       // Here you would typically send the data to your API
    //       console.log("Submitting client data:", formData)

    //       // Simulate API call
    //       await new Promise((resolve) => setTimeout(resolve, 1000))

    //       // Redirect to clients list after successful creation
    //       router.push("/admin/clients")
    //     } catch (error) {
    //       console.error("Error creating client:", error)
    //     } finally {
    //       setIsSubmitting(false)
    //     }
    //   }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();  // Prevent form default submit action
        setIsSubmitting(true);  // Show loading state
        // Prepare the data to be sent in the POST request
        const clientData = {
            name: formData.name,
            specialization: formData.specialization,
            discountPercentage: formData.discountPercentage,
            pointsRequired: formData.pointsRequired,
            type: formData.type
        };

        try {
            // Send the POST request using Axios
            const response = await axios.post("/api/createClient", clientData);

            // Handle success (you can update the UI or show a success message)
            console.log("Client created:", response.data);
            alert("Client created successfully!");
            setIsSubmitting(false)
            // Reset form fields after successful submission
            setFormData({
                name: "",
                specialization: "",
                discountPercentage: 0,
                pointsRequired: 0,
                type: ""
            })
        } catch (error) {
            setIsSubmitting(false)
            // Handle error (you can display an error message)
            console.error("Error creating client:", error);
            alert("Failed to create client.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Client</h1>
                    <p className="text-muted-foreground">Add a new corporate client to the system.</p>
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
                        <CardDescription>Enter the details of the new corporate client.</CardDescription>
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
                                <Label htmlFor="discountPercentage">DiscountPercentage</Label>
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
                                <Label htmlFor="pointsRequired">PointsRequired</Label>
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
                                <Label htmlFor="plan">Subscription Plan</Label>
                                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                                    <SelectTrigger id="plan">
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientsTypes.map((type) => (
                                            <SelectItem value={type} key={type}>
                                                {type}
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
                            {isSubmitting ? "Creating..." : "Create Client"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

