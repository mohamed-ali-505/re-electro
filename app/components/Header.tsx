import Link from "next/link"
import { Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header() {
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
              <Link href="/profile" className="text-sm font-medium text-white hover:text-green-100">
                Profile
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/recycle">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium">Recycle Now</Button>
            </Link>
          </div>
        </div>

        {/* Corporate Buttons */}
        <div className="flex justify-center space-x-4 py-4 border-t border-green-500">
          <Link href="/signup">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium">Corporate Signup</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="bg-white text-gray-900 border-gray-200 hover:bg-gray-50 font-medium">
              Corporate Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

