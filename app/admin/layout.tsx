import type { ReactNode } from "react"
import { AdminSidebar } from "./_components/admin-sidebar"
import { AdminHeader } from "./_components/admin-header"
// import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {

  // Add a small delay to let the middleware handle the role check first
  // await new Promise(resolve => setTimeout(resolve, 100));

  
  // if (session?.user?.role !== "admin") {
  //   // redirect('/');
  // }

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

