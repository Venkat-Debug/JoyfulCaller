import { useState } from 'react'

const Navbar = ({ darkMode, toggleDarkMode, onNavigateSettings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Settings', href: '#settings', isSettings: true },
  ]

  const handleNavClick = (e, href, isSettings) => {
    e.preventDefault()
    if (isSettings && onNavigateSettings) {
      onNavigateSettings()
      setMobileMenuOpen(false)
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav className="w-full py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-transparent dark:border-white/5">
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow-sm cursor-pointer hover:scale-110 transition-transform duration-200 hover:rotate-12"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setHoveredItem('logo')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <span 
            className={`material-icons-round text-white text-xl transition-transform duration-200 ${
              hoveredItem === 'logo' ? 'animate-spin' : ''
            }`}
          >
            bolt
          </span>
        </div>
        <span className="font-display font-bold text-xl md:text-2xl text-[#FAB005] dark:text-[#FFC107] cursor-pointer hover:scale-105 transition-transform">
          Joyful Caller
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-display text-sm font-medium text-text-sub dark:text-text-dark-sub">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href, item.isSettings)}
            className="hover:text-primary dark:hover:text-primary transition-colors cursor-pointer relative group"
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {item.label}
            <span 
              className={`absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                hoveredItem === item.label ? 'w-full' : ''
              }`}
            />
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-icons-round text-text-main dark:text-text-dark-main">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-icons-round text-text-main dark:text-text-dark-main text-2xl">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-text-main dark:text-text-dark-main p-2"
          aria-label="Toggle menu"
        >
          <span className="material-icons-round text-3xl transition-transform duration-200">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700 md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isSettings)}
                className="font-display text-sm font-medium text-text-sub dark:text-text-dark-sub hover:text-primary dark:hover:text-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

