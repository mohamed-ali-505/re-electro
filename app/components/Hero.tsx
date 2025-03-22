import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="w-full bg-white">
      <div className="w-full grid lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 py-16">
        {/* Left Column - Text Content */}
        <div className="w-full max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="text-gray-900">Sustainable recycling</span>{" "}
            <span className="text-green-600 block mt-2">for a cleaner Egypt</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            ReElectro connects you with certified e-waste recycling factories in Cairo. Join us in building a
            sustainable future, one recycled item at a time!
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/recycle">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Start Recycling
              </Button>
            </Link>
            <Link href="/points">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-green-600 border-green-600 hover:bg-green-50"
              >
                Points & Discounts
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full bg-[#1e4d6b] rounded-lg p-8 flex items-center justify-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp-Image-2023-01-30-at-12.22.41-PM-8-TIw7sylXdyMfz5CxXJ7kkBuPCDZl2I.jpeg"
            alt="Electronic waste recycling symbol with devices"
            width={600}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  )
}

