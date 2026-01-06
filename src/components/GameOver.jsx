import { useEffect } from 'react'

const GameOver = ({ onNewGame, onReset, darkMode }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md animate-scaleIn">
        <div className="bg-gradient-to-br from-white via-orange-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-[3rem] p-8 md:p-10 shadow-2xl border-2 border-orange-200/50 dark:border-orange-900/30 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-2xl -ml-20 -mb-20"></div>
          
          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#FB923C', '#F59E0B', '#EC4899', '#F472B6', '#FCD34D'][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform rotate-12 animate-bounce-slow">
                  <span className="material-icons-round text-5xl text-white">celebration</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-ping">
                  <span className="material-icons-round text-lg text-white">star</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center animate-pulse">
                  <span className="material-icons-round text-sm text-white">auto_awesome</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-orange-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
              🎉 Game Complete! 🎉
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
              All 90 Numbers Called!
            </p>
            
            {/* Message */}
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Congratulations! You've successfully called all numbers. 
              <br />
              <span className="font-semibold text-orange-600 dark:text-orange-400">Ready for another round?</span>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onNewGame}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <span className="material-icons-round text-xl">refresh</span>
                <span className="relative z-10">New Game</span>
              </button>
              
              <button
                onClick={onReset}
                className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl border-2 border-slate-200 dark:border-slate-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="material-icons-round text-xl">home</span>
                <span>Go Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameOver

