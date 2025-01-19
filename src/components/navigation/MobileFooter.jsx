import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  TrophyIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  TrophyIcon as TrophyIconSolid,
  DocumentTextIcon as DocumentIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/solid'

export default function MobileFooter() {
  const location = useLocation()
  
  const menuItems = [
    {
      name: 'Form Guide',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
      href: '/form-guide'
    },
    {
      name: 'Winners Circle',
      icon: TrophyIcon,
      activeIcon: TrophyIconSolid,
      href: '/winners-circle'
    },
    {
      name: 'Race Card',
      icon: DocumentTextIcon,
      activeIcon: DocumentIconSolid,
      href: '/race-card'
    },
    {
      name: 'Mailbag',
      icon: EnvelopeIcon,
      activeIcon: EnvelopeIconSolid,
      href: '/mailbag'
    },
    {
      name: 'Stable',
      icon: UserIcon,
      activeIcon: UserIconSolid,
      href: '/stable'
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 lg:hidden">
      <div className="grid grid-cols-5">
        {menuItems.map((item) => {
          const Icon = isActive(item.href) ? item.activeIcon : item.icon
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 ${
                isActive(item.href) 
                  ? 'text-blue-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
