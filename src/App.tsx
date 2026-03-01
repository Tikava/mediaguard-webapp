import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Result from './pages/Result'
import History from './pages/History'
import Error404 from './pages/Error404'

const App: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </MainLayout>
  )
}

export default App
