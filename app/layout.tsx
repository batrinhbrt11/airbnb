import './globals.css'
import { Nunito } from "next/font/google"
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modal/RegisterModal'
import ToastProvider from './providers/ToastProvider'
import LoginModal from './components/modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/modal/RentModal'
import ClientOnly from './components/ClientOnly'
import SearchModal from './components/modal/SearchModal'

export const metadata = {
  title: 'AirBnB',
  description: 'Homestay booking app',
}
const font = Nunito({
  subsets: ["latin"]
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>

        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
