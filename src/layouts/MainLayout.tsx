import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1 pb-16 pt-10">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
