"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { UsersType } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestStatus } from "@/models/Requests"

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<UsersType[]>([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const [formData, setFormData] = useState({
    status: "",
    points: 0,
    id: "",
    email: "",
    phone: "",
  })

  const filteredRequests = data.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users`);
      setLoading(false);
      setData(response.data);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const requestData = {
      newPoints: formData.points,
      id: formData.id,
      status: formData.status,
      email: formData.email,
      phone: formData.phone
    };

    try {
      // Send the POST request using Axios
      await axios.post("/api/createRequest", requestData);

      // Handle success (you can update the UI or show a success message)

      fetchData().then(() => {
        setIsSubmitting(false)
        handleClose()
        setFormData({
          status: "",
          points: 0,
          id: "",
          email: "",
          phone: ""
        })
      })
      // Reset form fields after successful submission

    } catch (error) {
      setIsSubmitting(false)
      // Handle error (you can display an error message)
      console.error("Error creating request:", error);
      alert("Failed to create request.");
    }
  };

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          {/* <p className="text-muted-foreground">Manage all corporate Requests registered in the system.</p> */}
        </div>

      </div>

      {open &&
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription className="space-y-2">
                <div>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {RequestStatus.map((type) => (
                        <SelectItem value={type} key={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.status === "completed" && <div>
                  <Label htmlFor="name">points</Label>
                  <Input
                    id="points"
                    name="points"
                    value={formData.points}
                    onChange={handleChange}
                    type="number"
                    required
                  />
                </div>}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Requests List</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Requests..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No Requests found
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filteredRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.role}</TableCell>
                    <TableCell>{request.email}</TableCell>
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>{request.points}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


