import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ErrorBoundary from './components/ErrorBoundary'
import ToastContainer from './components/ToastContainer'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'

const Home = React.lazy(() => import('./pages/Home'))
const Result = React.lazy(() => import('./pages/Result'))
const History = React.lazy(() => import('./pages/History'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Error404 = React.lazy(() => import('./pages/Error404'))

const PageSpinner: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600" aria-label="Loading" />
  </div>
)

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <PageSpinner />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

const AppRoutes: React.FC = () => (
  <MainLayout>
    <Suspense fallback={<PageSpinner />}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/result/:id"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
    </Suspense>
  </MainLayout>
)

const App: React.FC = () => (
  <ErrorBoundary>
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </ToastProvider>
  </ErrorBoundary>
)

export default App
