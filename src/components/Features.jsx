import { useState } from 'react'

const Features = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [clickedCard, setClickedCard] = useState(null)

  const features = [
    {
      id: 1,
      title: 'Big Reveal Moment',
      description: 'Coin pops out ~ number lands with joy.',
      icon: 'flare',
      bgColor: 'bg-pastel-orange',
      iconBg: 'bg-gradient-to-br from-orange-300 to-yellow-200',
      iconColor: 'text-white',
      badge: true,
      badgeColor: 'bg-red-300',
    },
    {
      id: 2,
      title: 'Bento Board Zones',
      description: '1–90 becomes friendly zones, not a scary grid.',
      icon: 'grid_on',
      bgColor: 'bg-pastel-green',
      iconBg: 'bg-white/60 dark:bg-gray-700',
      iconColor: 'text-green-600',
      customIcon: 'bento',
    },
    {
      id: 3,
      title: 'Smart Highlighting',
      description: 'The zone glows so your brain instantly maps it.',
      icon: 'grid_on',
      bgColor: 'bg-pastel-blue',
      iconBg: 'bg-gradient-to-tr from-blue-200 to-cyan-100',
      iconColor: 'text-blue-500',
      glow: true,
    },
    {
      id: 4,
      title: 'Voice Calling',
      description: 'Clear cadence, perfect for family games.',
      icon: 'campaign',
      bgColor: 'bg-pastel-purple',
      iconBg: 'bg-gradient-to-bl from-pink-200 to-purple-200',
      iconColor: 'text-purple-600',
      rotate: true,
    },
    {
      id: 5,
      title: 'Slang Mode',
      description: 'Classic Tambola fun lines, optional.',
      icon: 'chat',
      bgColor: 'bg-pastel-green/50',
      iconBg: 'bg-yellow-300',
      iconColor: 'text-white',
      customIcon: 'slang',
    },
    {
      id: 6,
      title: 'Hold-to-Reset',
      description: 'No accidental resets. Ever.',
      icon: 'restart_alt',
      bgColor: 'bg-pastel-red',
      iconBg: 'bg-white dark:bg-gray-700',
      iconColor: 'text-purple-500',
      rotate: true,
    },
  ]

  const handleCardClick = (id) => {
    setClickedCard(id)
    setTimeout(() => setClickedCard(null), 600)
  }

  return (
    <section id="features" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-text-main dark:text-white mb-12 text-center md:text-left">
        Made to feel like a real game.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => handleCardClick(feature.id)}
            onMouseEnter={() => setHoveredCard(feature.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`${feature.bgColor} dark:bg-gray-800 dark:border dark:border-gray-700 rounded-[2rem] p-8 flex flex-col items-start shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer transform ${
              hoveredCard === feature.id ? 'scale-105 -translate-y-2' : ''
            } ${
              clickedCard === feature.id ? 'scale-95' : ''
            }`}
          >
            <div className="mb-6 relative">
              {feature.customIcon === 'bento' ? (
                <div className={`w-16 h-16 rounded-2xl ${feature.iconBg} grid grid-cols-3 grid-rows-2 gap-1 p-2 shadow-inner transition-transform ${
                  hoveredCard === feature.id ? 'rotate-12 scale-110' : ''
                }`}>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-400 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              ) : feature.customIcon === 'slang' ? (
                <div className="relative">
                  <div className={`w-16 h-12 ${feature.iconBg} rounded-t-2xl rounded-br-2xl rounded-bl-none flex items-center justify-center shadow-md transition-transform ${
                    hoveredCard === feature.id ? 'scale-110 rotate-6' : ''
                  }`}>
                    <span className="text-white text-2xl font-black">...</span>
                  </div>
                  <div className="absolute -bottom-2 -left-1 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-yellow-300 border-r-[5px] border-r-transparent"></div>
                </div>
              ) : (
                <div
                  className={`w-16 h-16 ${feature.id === 3 ? 'rounded-2xl' : 'rounded-full'} ${feature.iconBg} flex items-center justify-center shadow-md transition-all duration-300 ${
                    hoveredCard === feature.id ? 'scale-125 rotate-12' : ''
                  } ${feature.rotate ? 'transform -rotate-12' : ''} ${
                    feature.glow ? 'border border-white/50' : ''
                  }`}
                >
                  <span
                    className={`material-icons-round ${feature.iconColor} text-3xl transition-transform ${
                      hoveredCard === feature.id && feature.id === 4 ? 'animate-bounce' : ''
                    }`}
                    style={{
                      transform: feature.id === 6 && hoveredCard === feature.id ? 'rotate(180deg)' : 'none',
                    }}
                  >
                    {feature.icon}
                  </span>
                  {feature.glow && (
                    <div className="absolute top-0 right-0 w-full h-full bg-blue-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
                  )}
                </div>
              )}
              {feature.badge && (
                <div
                  className={`absolute -top-1 -right-1 w-3 h-3 ${feature.badgeColor} rounded-full transition-all ${
                    hoveredCard === feature.id ? 'animate-bounce scale-150' : 'animate-bounce'
                  }`}
                ></div>
              )}
            </div>
            <h3 className="font-display font-bold text-xl text-text-main dark:text-white mb-3 transition-colors">
              {feature.title}
            </h3>
            <p className="font-body text-text-sub dark:text-gray-400 text-sm leading-relaxed">
              {feature.description}
            </p>
            {hoveredCard === feature.id && (
              <div className="mt-4 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features

