import type { ReactNode } from "react"
import { AdminSidebar } from "./_components/admin-sidebar"
import { AdminHeader } from "./_components/admin-header"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-6 overflow-auto max-w-6xl mx-auto w-full">{children}</main>
      </div>
    </div>
  )
}

