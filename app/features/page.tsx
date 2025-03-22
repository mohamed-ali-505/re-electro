import Header from '../components/Header'
import Footer from '../components/Footer'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="w-full bg-white py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-8">Our Features</h1>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Smart Collection System</h2>
                <p className="text-gray-600">
                  Our automated collection system allows you to schedule pickups at your convenience. 
                  We use route optimization to ensure efficient collection of e-waste.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Tracking & Reporting</h2>
                <p className="text-gray-600">
                  Track your recycling impact in real-time. Get detailed reports about your contribution 
                  to environmental preservation.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Reward Program</h2>
                <p className="text-gray-600">
                  Earn points for every item recycled. Redeem points for eco-friendly products or 
                  donate them to environmental causes.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Certified Processing</h2>
                <p className="text-gray-600">
                  All e-waste is processed by certified recycling facilities, ensuring proper handling 
                  and minimal environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

