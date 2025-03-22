import Link from 'next/link'

export default function CTA() {
  return (
    <div className="bg-green-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to recycle?</span>
          <span className="block">Start your journey today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-200">
          Join us in building a sustainable Egypt, one recycled item at a time!
        </p>
        <Link
          href="/recycle"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

