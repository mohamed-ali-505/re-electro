import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="w-full bg-white py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-8">About ReElectro</h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-gray-600 mb-6">
                    ReElectro is dedicated to promoting sustainable recycling solutions by connecting 
                    individuals and businesses with certified electronic waste recycling factories in Cairo.
                  </p>
                  
                  <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                  <p className="text-gray-600 mb-6">
                    We envision a cleaner Egypt where electronic waste is properly managed and recycled, 
                    contributing to environmental preservation and sustainable development.
                  </p>

                  <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Over 10,000 devices recycled</li>
                    <li>500+ satisfied customers</li>
                    <li>Partnerships with 20+ certified recycling facilities</li>
                    <li>Reduced carbon footprint by 1000+ tons</li>
                  </ul>
                </div>

                <div className="bg-[#1e4d6b] rounded-lg p-8">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="About ReElectro"
                    width={400}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

