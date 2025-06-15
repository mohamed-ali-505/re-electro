"use client"
import Link from "next/link"
import { Leaf, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { signOut, useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import { handleLogout } from "@/actions/cookies"
import { useAuth } from "@/lib/AuthProvider"

export default function Header() {
  // const session = useSession();
  const context = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogoutFunc = async () => {
    setLogoutLoading(true);
    await handleLogout().finally(() => {
      context?.setSession(null);
      setLogoutLoading(false);
    });

  }

  return (
    <header className="w-full bg-green-600 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-12">
            <Link href="/" className="flex items-center">
              <Leaf className="h-6 w-6 text-white" />
              <span className="ml-2 text-xl font-semibold text-white">ReElectro</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-sm font-medium text-white hover:text-green-100">
                Features
              </Link>
              <Link href="/process" className="text-sm font-medium text-white hover:text-green-100">
                Our Process
              </Link>
              <Link href="/points" className="text-sm font-medium text-white hover:text-green-100">
                Points & Discounts
              </Link>
              <Link href="/about" className="text-sm font-medium text-white hover:text-green-100">
                About Us
              </Link>
              {context?.session?.role === "admin" && (
                <Link href="/admin" className="text-sm font-medium text-white hover:text-green-100">
                  Admin Page
                </Link>
              )}
              {context?.session?.role === "user" && (
                <Link href="/profile" className="text-sm font-medium text-white hover:text-green-100">
                  Profile
                </Link>
              )}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/features" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                    Features
                  </Link>
                  <Link href="/process" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                    Our Process
                  </Link>
                  <Link href="/points" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                    Points & Discounts
                  </Link>
                  <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                    About Us
                  </Link>
                  {context?.session?.role === "admin" && (
                    <Link href="/admin" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                      Admin Page
                    </Link>
                  )}
                  {context?.session?.role === "user" && (
                    <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                      Profile
                    </Link>
                  )}
                  {!context?.session && (
                    <>
                      <Link href="/signup" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                        Corporate Signup
                      </Link>
                      <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-green-600" onClick={() => setIsSidebarOpen(false)}>
                        Corporate Login
                      </Link>
                    </>
                  )}
                  {context?.session && (
                    <Button variant="ghost" className="text-gray-700 hover:text-green-600" onClick={() => {
                      // handleLogout();
                      setIsSidebarOpen(false);
                    }}>
                      Logout
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/recycle">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium">Recycle Now</Button>
            </Link>
            {context?.session && <Button
              variant={"outline"}
              onClick={() => {
                handleLogoutFunc();
              }}
              disabled={logoutLoading}
            >
              {logoutLoading ? <span>
                <span className="animate-spin flex w-4 h-4 border-2 rounded-full
                 border-t-green-500 border-r-green-500 border-b-green-500"></span>
              </span> : "Logout"}
            </Button>}
          </div>
        </div>

        {/* Corporate Buttons */}
        {!context?.session && <div className="hidden md:flex justify-center space-x-4 py-4 border-t border-green-500">
          <Link href="/signup">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium">Corporate Signup</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="bg-white text-gray-900 border-gray-200 hover:bg-gray-50 font-medium">
              Corporate Login
            </Button>
          </Link>
        </div>}
      </div>
    </header>
  )
}

