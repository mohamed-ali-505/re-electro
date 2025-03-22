import Header from '../components/Header'
import Footer from '../components/Footer'
import { ArrowRight, Truck, Factory, CheckCircle } from 'lucide-react'

export default function ProcessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="w-full bg-white py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12">Our Recycling Process</h1>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Process Steps */}
                <div className="space-y-16">
                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold mb-2">1. Request Pickup</h3>
                      <p className="text-gray-600">
                        Submit your recycling request through our platform. Provide details about your 
                        e-waste items and schedule a convenient pickup time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold mb-2">2. Collection</h3>
                      <p className="text-gray-600">
                        Our professional team arrives at your location to collect the e-waste. 
                        All items are properly handled and safely transported.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white">
                      <Factory className="h-6 w-6" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold mb-2">3. Processing</h3>
                      <p className="text-gray-600">
                        The collected e-waste is transported to our certified recycling facilities 
                        where it undergoes proper processing and recycling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-500 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold mb-2">4. Completion</h3>
                      <p className="text-gray-600">
                        Receive a certificate of recycling and earn reward points. Track your 
                        environmental impact through our dashboard.
                      </p>
                    </div>
                  </div>
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

