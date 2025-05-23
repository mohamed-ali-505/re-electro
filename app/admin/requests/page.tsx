"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { RequestType } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RequestStatus } from "@/models/Requests"
import StatusBadge from "@/components/StatusColor"

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<RequestType[]>([])
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<RequestType | null>(null);

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
      const response = await axios.get(`/api/requests`);
      // setLoading(false);
      setData(response.data);
    } catch {
      // setLoading(false);

    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleOpen = ({
    id,
    email,
    phone,
  }: {
    id: string,
    email: string,
    phone: string,
  }) => {
    setOpen(true);
    setFormData((prev) => ({ ...prev, id, email, phone }));
  }

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

  const handleViewDetails = (request: RequestType) => {
    setSelectedRequest(request);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Corporate Requests</h1>
          <p className="text-muted-foreground">Manage all corporate Requests registered in the system.</p>
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
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="max-w-[150px]">Email</TableHead>
                <TableHead className="max-w-[120px]">Phone</TableHead>
                <TableHead className="max-w-[200px]">Address</TableHead>
                <TableHead className="max-w-[200px]">Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                filteredRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium max-w-[150px] truncate" title={request.name}>
                      {request.name}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={request.status as any} />
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate" title={request.email}>
                      {request.email}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate" title={request.phone}>
                      {request.phone}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={request.address}>
                      {request.address}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate" title={request.items}>
                      {request.items}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(request)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Details</span>
                        </Button>
                        {request.status !== "completed" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpen({ id: request._id, email: request.email, phone: request.phone })}
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="text-sm">{selectedRequest.name}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <StatusBadge status={selectedRequest.status as any} />
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-sm">{selectedRequest.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-sm">{selectedRequest.phone}</p>
                </div>
                <div className="col-span-2">
                  <Label>Address</Label>
                  <p className="text-sm">{selectedRequest.address}</p>
                </div>
                <div className="col-span-2">
                  <Label>Items</Label>
                  <p className="text-sm">{selectedRequest.items}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


