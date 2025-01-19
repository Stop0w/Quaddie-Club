import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './routes/routes'
import Navigation from './components/navigation/Navigation'
import MobileMenu from './components/navigation/MobileMenu'
import useAuthStore from './store/authStore'

function App() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  // Don't show navigation on login and register pages
  const hideNavigation = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!hideNavigation && <Navigation />}
      {!hideNavigation && isAuthenticated && <MobileMenu />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}
        </Routes>
      </main>
    </div>
  )
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}
