import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import AdminRoute from '../components/auth/AdminRoute'
import LoadingSpinner from '../components/common/LoadingSpinner'

// Lazy-loaded components
const HomePage = lazy(() => import('../pages/HomePage'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const CompetitionsList = lazy(() => import('../pages/CompetitionsList'))
const TipsPage = lazy(() => import('../pages/TipsPage'))
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const ManagementHub = lazy(() => import('../pages/ManagementHub'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const PaymentPage = lazy(() => import('../pages/PaymentPage'))
const SupportPage = lazy(() => import('../pages/SupportPage'))
const SocialPage = lazy(() => import('../pages/SocialPage'))

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

export const routes = [
  {
    path: '/',
    element: withSuspense(HomePage),
    public: true
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        {withSuspense(Dashboard)}
      </ProtectedRoute>
    )
  },
  {
    path: '/competitions',
    element: (
      <ProtectedRoute>
        {withSuspense(CompetitionsList)}
      </ProtectedRoute>
    )
  },
  {
    path: '/tips',
    element: (
      <ProtectedRoute>
        {withSuspense(TipsPage)}
      </ProtectedRoute>
    )
  },
  {
    path: '/leaderboard',
    element: (
      <ProtectedRoute>
        {withSuspense(LeaderboardPage)}
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        {withSuspense(ProfilePage)}
      </ProtectedRoute>
    )
  },
  {
    path: '/management-hub',
    element: (
      <AdminRoute>
        {withSuspense(ManagementHub)}
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: withSuspense(RegisterPage),
    public: true
  },
  {
    path: '/login',
    element: withSuspense(LoginPage),
    public: true
  },
  {
    path: '/payment',
    element: (
      <ProtectedRoute>
        {withSuspense(PaymentPage)}
      </ProtectedRoute>
    )
  },
  {
    path: '/support',
    element: withSuspense(SupportPage),
    public: true
  },
  {
    path: '/social',
    element: (
      <ProtectedRoute>
        {withSuspense(SocialPage)}
      </ProtectedRoute>
    )
  }
]
