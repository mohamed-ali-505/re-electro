import { Users, Gift, Recycle } from 'lucide-react'

export default function Features() {
  return (
    <div className="w-full bg-white py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">A better way to recycle</p>
          <p className="mt-4 text-xl text-gray-500">
            Discover how ReElectro makes electronic waste recycling accessible and impactful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Recycle className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900">Recycle Responsibly</h3>
            </div>
            <p className="text-gray-500">
              Safely dispose of outdated or unused electronic devices, including phones, laptops, and appliances.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900">Connect with Experts</h3>
            </div>
            <p className="text-gray-500">
              Partner with verified recycling factories to guarantee proper handling and processing of electronic waste.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="ml-4 text-xl font-medium text-gray-900">Discover Benefits</h3>
            </div>
            <p className="text-gray-500">
              Learn about exclusive discounts, incentives, and eco-friendly initiatives designed to reward responsible recycling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

