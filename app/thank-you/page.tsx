import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900">Thank You!</h1>
            <p className="mt-2 text-sm text-gray-600">Your recycling request has been submitted successfully.</p>
            <p className="mt-4 text-sm text-gray-600">We'll be in touch soon to arrange the collection of your electronic waste.</p>
            <Link href="/" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

