"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import axios from 'axios'
import { toast } from 'sonner'

interface DiscountRedemption {
  _id: string
  points: number
  discountId: {
    name: string
    specialization: string
    discountPercentage: number
    pointsRequired: number
  }
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  userId: {
    name: string
    email: string
    phoneNumber?: string
    points: number
  }
}

export default function DiscountRedemptionsPage() {
  const [requests, setRequests] = useState<DiscountRedemption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('/api/discount-redemptions')
      setRequests(response.data)
    } catch (error) {
      console.error('Error fetching discount redemption requests:', error)
      setError('Failed to load redemption requests')
      toast.error('Failed to load redemption requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      setLoading(true)
      await axios.patch(`/api/discount-redemptions/${id}`, { status })
      toast.success(`Request ${status} successfully`)
      fetchRequests()
    } catch (error) {
      console.error('Error updating request status:', error)
      toast.error('Failed to update request status')
    } finally {
      setLoading(false)
    }
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

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Discount Redemption Requests</h1>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-500">No redemption requests found</div>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {requests.map((request) => (
            <AccordionItem key={request._id} value={request._id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{request.userId.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.userId.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{request.discountId.name}</span>
                      <span className="text-sm text-muted-foreground">({request.points} points)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(request.status)}
                    <span className="text-sm text-muted-foreground">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">User Information</p>
                      <p>Name: {request.userId.name}</p>
                      <p>Email: {request.userId.email}</p>
                      {request.userId.phoneNumber && <p>Phone: {request.userId.phoneNumber}</p>}
                      <p>Current Points: {request.userId.points}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Discount Details</p>
                      <p>Name: {request.discountId.name}</p>
                      <p>Specialization: {request.discountId.specialization}</p>
                      <p>Discount: {request.discountId.discountPercentage}%</p>
                      <p>Points Required: {request.discountId.pointsRequired}</p>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="default"
                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                        disabled={loading}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                        disabled={loading}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
} 