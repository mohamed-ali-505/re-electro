"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, ClipboardList, Clock, User, Trophy } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

interface User {
  role: string
  isCorporate: boolean
  name: string
  points: number
}

interface Request {
  items: string
  status: string
  name: string
  createdAt: string
}

interface Redemption {
  status: string
  points: number
  createdAt: string
}

interface DiscountRedemption {
  status: string
  points: number
  createdAt: string
  discount: {
    name: string
  }
}

interface DashboardStats {
  totalUsers: number
  registeredUsers: number
  guestUsers: number
  pendingRequests: number
  completedRequests: number
  totalRequests: number
  corporateClients: number
  recentActivity: Request[]
  topUsers: User[]
  pendingRedemptions: number
  completedRedemptions: number
  totalRedemptions: number
  pendingDiscountRedemptions: number
  completedDiscountRedemptions: number
  totalDiscountRedemptions: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    registeredUsers: 0,
    guestUsers: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalRequests: 0,
    corporateClients: 0,
    recentActivity: [],
    topUsers: [],
    pendingRedemptions: 0,
    completedRedemptions: 0,
    totalRedemptions: 0,
    pendingDiscountRedemptions: 0,
    completedDiscountRedemptions: 0,
    totalDiscountRedemptions: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, requestsResponse, redemptionsResponse, discountRedemptionsResponse] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/requests'),
          axios.get('/api/redemptions'),
          axios.get('/api/discount-redemptions')
        ])

        const users = usersResponse.data as User[]
        const requests = requestsResponse.data as Request[]
        const redemptions = redemptionsResponse.data as Redemption[]
        const discountRedemptions = discountRedemptionsResponse.data as DiscountRedemption[]

        // Debug logging
        console.log('All users:', users)
        console.log('Users with points:', users.filter(user => user.points > 0))

        // Calculate user types based on role
        const registeredUsers = users.filter(user => user.role === 'user').length
        const guestUsers = users.filter(user => user.role === 'guest').length

        // Calculate corporate clients (users with isCorporate flag)
        const corporateClients = users.filter(user => user.isCorporate).length

        // Calculate completed and pending requests
        const completedRequests = requests.filter(request => request.status === 'completed').length
        const pendingRequests = requests.filter(request => 
          request.status === 'pending' || 
          request.status === 'accepted' || 
          request.status === 'onDelivery'
        ).length
        const totalRequests = completedRequests + pendingRequests

        // Get recent activity (last 5 requests)
        const recentActivity = requests
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)

        // Get top users (sorted by points, only users with points)
        const usersWithPoints = users.filter(user => user.points > 0)
        console.log('Users with points after filter:', usersWithPoints)
        
        const topUsers = usersWithPoints
          .sort((a, b) => b.points - a.points)
          .slice(0, 5)

        console.log('Final top users:', topUsers)

        // Calculate redemption stats
        const pendingRedemptions = redemptions.filter(r => r.status === 'pending').length
        const completedRedemptions = redemptions.filter(r => r.status === 'approved').length
        const totalRedemptions = redemptions.length

        // Calculate discount redemption stats
        const pendingDiscountRedemptions = discountRedemptions.filter(r => r.status === 'pending').length
        const completedDiscountRedemptions = discountRedemptions.filter(r => r.status === 'approved').length
        const totalDiscountRedemptions = discountRedemptions.length

        setStats({
          totalUsers: users.length,
          registeredUsers,
          guestUsers,
          pendingRequests,
          completedRequests,
          totalRequests,
          corporateClients,
          recentActivity,
          topUsers,
          pendingRedemptions,
          completedRedemptions,
          totalRedemptions,
          pendingDiscountRedemptions,
          completedDiscountRedemptions,
          totalDiscountRedemptions
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        toast.error('Failed to load dashboard statistics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the ReElectro admin dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {isLoading ? "..." : `${stats.registeredUsers} registered, ${stats.guestUsers} guests`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Requests waiting to be processed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Recycled</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.completedRequests}</div>
                <p className="text-xs text-muted-foreground">Successfully processed requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.totalRequests}</div>
                <p className="text-xs text-muted-foreground">All recycling requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Redemptions</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.pendingRedemptions}</div>
                <p className="text-xs text-muted-foreground">Money redemption requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Redemptions</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.completedRedemptions}</div>
                <p className="text-xs text-muted-foreground">Approved money redemptions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Discounts</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.pendingDiscountRedemptions}</div>
                <p className="text-xs text-muted-foreground">Discount redemption requests</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Discounts</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.completedDiscountRedemptions}</div>
                <p className="text-xs text-muted-foreground">Approved discount redemptions</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest recycling requests</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    Loading recent activity...
                  </div>
                ) : stats.recentActivity.length === 0 ? (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    No recent activity
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.recentActivity.map((request, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{request.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.status === 'completed' ? 'bg-green-100 text-green-800' :
                          request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <CardDescription>Users with highest points</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[200px] flex items-center justify-center">
                    Loading top users...
                  </div>
                ) : stats.topUsers.length === 0 ? (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    No users with points yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {stats.topUsers.map((user, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Trophy className={`h-4 w-4 ${
                            index === 0 ? 'text-yellow-500' :
                            index === 1 ? 'text-gray-400' :
                            index === 2 ? 'text-amber-600' :
                            'text-muted-foreground'
                          }`} />
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.points} points
                            </p>
                          </div>
                        </div>
                        {user.isCorporate && (
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                            Corporate
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
    </div>
  )
}

