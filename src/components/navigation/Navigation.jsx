import { Link, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

export default function Navigation() {
  const location = useLocation()
  const { user, isAuthenticated } = useAuthStore()
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', private: true },
    { name: 'Competitions', href: '/competitions', private: true },
    { name: 'Tips', href: '/tips', private: true },
    { name: 'Leaderboard', href: '/leaderboard', private: true },
    { name: 'Social', href: '/social', private: true },
    { name: 'Support', href: '/support', private: false }
  ]

  // Add admin routes if user is admin
  if (user?.role === 'admin') {
    navigation.push({ name: 'Management Hub', href: '/management-hub', private: true })
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                Quaddie Challenge
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                (!item.private || isAuthenticated) && (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium
                      ${isActive(item.href)
                        ? 'border-b-2 border-primary-500 text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className={`
                    text-sm font-medium
                    ${isActive('/profile')
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }
                  `}
                >
                  Profile
                </Link>
                <button
                  onClick={() => useAuthStore.getState().logout()}
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
