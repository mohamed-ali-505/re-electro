import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Discounts from "./components/Discounts"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import CorporateSection from "./components/CorporateSection"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Discounts />
        <CTA />
        <CorporateSection />
      </main>
      <Footer />
    </div>
  )
}

