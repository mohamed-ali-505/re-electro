import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

export default function Discounts() {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Rewards</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Earn Points, Get Discounts
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Recycle more, earn points, and enjoy exclusive discounts on various services.
          </p>
        </div>

        <div className="mt-10">
          <div className="flex justify-center">
            <div className="relative">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-500 text-white">
                <Gift className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="mt-4 text-lg leading-6 font-medium text-gray-900">Exclusive Discounts</p>
              <p className="mt-2 text-base text-gray-500">
                Redeem your points for discounts on medical services, lab tests, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href="/points">View Points & Discounts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

