"use client"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Building2, Recycle, BarChart } from 'lucide-react'
import { useSession } from 'next-auth/react'
export default function CorporateSection() {
  const session = useSession();
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">For Businesses</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Corporate E-Waste Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Join our network of sustainable businesses and manage your e-waste recycling at scale.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Building2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Dedicated Corporate Portal</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Access a tailored dashboard to manage your company's recycling efforts efficiently.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Recycle className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Bulk Recycling Requests</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Schedule large-scale pickups and manage multiple locations with ease.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <BarChart className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Detailed Reporting</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Get insights into your company's environmental impact and recycling performance.
              </p>
            </div>
          </div>
        </div>

        {!session?.data?.user && <div className="mt-10 flex justify-center space-x-6">
          <Button asChild>
            <Link href="/signup">Sign Up Your Company</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Corporate Login</Link>
          </Button>
        </div>}
      </div>
    </section>
  )
}

