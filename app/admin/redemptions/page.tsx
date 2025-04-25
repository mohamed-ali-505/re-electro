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

interface RedemptionRequest {
  _id: string
  points: number
  amount: number
  walletType: string
  walletNumber: string
  message: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  userId: {
    name: string
    email: string
  }
}

export default function RedemptionRequestsPage() {
  const [requests, setRequests] = useState<RedemptionRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/redemptions')
      setRequests(response.data)
    } catch (error) {
      console.error('Error fetching redemption requests:', error)
      toast.error('Failed to load redemption requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await axios.patch(`/api/redemptions/${id}`, { status })
      toast.success(`Request ${status} successfully`)
      fetchRequests()
    } catch (error) {
      console.error('Error updating request status:', error)
      toast.error('Failed to update request status')
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Redemption Requests</h1>
      
      {loading ? (
        <div>Loading...</div>
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
                      <span className="text-sm font-medium">£{request.amount}</span>
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
                      <p className="text-sm font-medium">Wallet Type</p>
                      <p className="capitalize">{request.walletType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Wallet Number</p>
                      <p>{request.walletNumber}</p>
                    </div>
                  </div>
                  {request.message && (
                    <div>
                      <p className="text-sm font-medium">Additional Message</p>
                      <p className="text-sm text-muted-foreground">{request.message}</p>
                    </div>
                  )}
                  {request.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="default"
                        onClick={() => handleStatusUpdate(request._id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
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