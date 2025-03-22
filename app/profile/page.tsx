import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        profile
      </main>
      <Footer />
    </div>
  )
}

