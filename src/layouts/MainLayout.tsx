import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pb-16 pt-10">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
