import { useState } from 'react'
import { Link } from 'react-router-dom'
import HamburgerIcon from './HamburgerIcon'

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Form Guide', href: '/form-guide' },
    { name: 'Winners Circle', href: '/winners-circle' },
    { name: 'Race Card', href: '/race-card' },
    { name: 'Gear Changes', href: '/gear-changes' },
    { name: 'Jockey', href: '/jockey' },
    { name: 'Mailbag', href: '/mailbag' },
    { name: 'Create Comp', href: '/create-competition' }
  ]

  return (
    <div className="lg:hidden">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black flex items-center justify-between px-4 z-50">
        <Link to="/">
          <img src="/qc-logo-white.svg" alt="Quaddie Club" className="h-8" />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/create-competition"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Create Comp
          </Link>
          <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Slide-out Menu */}
      <div 
        className={`
          fixed top-16 left-0 right-0 bottom-0 bg-black transform transition-transform duration-200 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto pb-20">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className="px-6 py-4 text-white border-b border-gray-800 hover:bg-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
