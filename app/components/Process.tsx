import { ClipboardList, Truck, Factory } from 'lucide-react'

const steps = [
  {
    name: 'Submit Request',
    description: 'Users submit a recycling request through our platform.',
    icon: ClipboardList,
  },
  {
    name: 'Collection',
    description: 'Our team collects the electronic waste directly from their location.',
    icon: Truck,
  },
  {
    name: 'Safe Processing',
    description: 'The waste is delivered to authorized recycling facilities for safe processing.',
    icon: Factory,
  },
]

export default function Process() {
  return (
    <div className="py-12 bg-green-50" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Process</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How ReElectro Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our simple three-step process ensures your electronic waste is recycled responsibly.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step) => (
              <div key={step.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{step.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

