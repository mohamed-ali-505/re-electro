"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Leaf, Users, ClipboardList, Building2, BarChart, LogOut, Receipt } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Requests",
      href: "/admin/requests",
      icon: ClipboardList,
    },
    {
      title: "Clients",
      href: "/admin/clients",
      icon: Building2,
    },
    {
      title: "Redemptions",
      href: "/admin/redemptions",
      icon: ClipboardList,
    },
    {
      title: "discount redemptions",
      href: "/admin/discount-redemptions",
      icon: Receipt,
    },
  ]

  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="border-r h-[calc(100vh-4rem)] w-64">
        <SidebarHeader className="border-b">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/admin" className="flex items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-green-600 text-white">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div className="ml-2">
                    <span className="font-semibold text-lg">ReElectro</span>
                    <span className="text-xs block text-muted-foreground">Admin Panel</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/logout" className="flex items-center text-red-500 hover:text-red-600">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

