import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppProvider from "@/lib/AppProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Re-Electro",
  description: "Re-Electro is a platform that connects individuals and businesses with certified electronic waste recycling facilities in Cairo.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions) // Explicitly pass authOptions
  console.log("session", session);
  

  return (
    <html lang="en">

      <AppProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster richColors />
        </body>
      </AppProvider>
    </html>
  );
}
