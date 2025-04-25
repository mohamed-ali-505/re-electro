"use client"
import Link from "next/link"
import { Leaf, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

export default function Header() {

  const session = useSession();
  console.log("session", session);


  const handleLogout = () => {
    signOut();
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
              {session?.data?.user && <Link href="/profile" className="text-sm font-medium text-white hover:text-green-100">
                Profile
              </Link>}
            </nav>
            <div className="flex md:hidden space-x-8">
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/recycle">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium">Recycle Now</Button>
            </Link>
            {session?.data?.user && <Button
              variant={"outline"}
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>}
          </div>
        </div>

        {/* Corporate Buttons */}
        {!session?.data?.user && <div className="flex justify-center space-x-4 py-4 border-t border-green-500">
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

