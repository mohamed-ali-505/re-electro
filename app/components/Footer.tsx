'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'
// import ForceLogout from './ForceLogout'
// import { useSession } from 'next-auth/react';

export default function Footer() {
  // const { data: session } = useSession();
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          {/* <ForceLogout /> */}
          <>
          {/* {JSON.stringify(session)} */}
          </>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; 2023 ReElectro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

