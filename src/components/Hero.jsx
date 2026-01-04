import { useState, useEffect } from 'react'

const Hero = ({ onPlayNow }) => {
  const [currentNumber, setCurrentNumber] = useState(88)
  const [isPicking, setIsPicking] = useState(false)
  const [pickedNumbers, setPickedNumbers] = useState([])
  const [hoveredIcon, setHoveredIcon] = useState(null)

  const tambolaSlang = {
    1: "Number One",
    2: "Buckle My Shoe",
    3: "You and Me",
    4: "Knock at the Door",
    5: "Little Hive",
    6: "Pick Up Sticks",
    7: "Lucky Seven",
    8: "Garden Gate",
    9: "Number Nine",
    10: "Big Fat Hen",
    11: "Legs Eleven",
    12: "One Dozen",
    13: "Unlucky for Some",
    14: "Valentine's Day",
    15: "Young and Keen",
    16: "Sweet Sixteen",
    17: "Dancing Queen",
    18: "Coming of Age",
    19: "Goodbye Teens",
    20: "One Score",
    22: "Two Little Ducks",
    25: "Duck and Dive",
    30: "Dirty Gertie",
    33: "All the Threes",
    36: "Three Dozen",
    40: "Life Begins",
    44: "All the Fours",
    50: "Half a Century",
    55: "All the Fives",
    60: "Five Dozen",
    66: "Clickety Click",
    69: "Either Way Up",
    70: "Three Score and Ten",
    77: "Two Little Crutches",
    80: "Eight and Blank",
    88: "Two Fat Ladies",
    90: "Top of the Shop",
  }

  const getSlang = (num) => tambolaSlang[num] || `Number ${num}`

  const generateRandomNumber = () => {
    const available = Array.from({ length: 90 }, (_, i) => i + 1).filter(
      (n) => !pickedNumbers.includes(n)
    )
    if (available.length === 0) {
      setPickedNumbers([])
      return Math.floor(Math.random() * 90) + 1
    }
    return available[Math.floor(Math.random() * available.length)]
  }

  const handlePickNumber = () => {
    if (isPicking) return
    
    setIsPicking(true)
    // Animate through numbers quickly
    let iterations = 0
    const tempNumbers = new Set()
    const interval = setInterval(() => {
      const num = generateRandomNumber()
      tempNumbers.add(num)
      setCurrentNumber(num)
      iterations++
      if (iterations > 15) {
        clearInterval(interval)
        const finalNumber = generateRandomNumber()
        setCurrentNumber(finalNumber)
        setPickedNumbers((prev) => {
          const updated = [...prev, finalNumber]
          // Reset if all 90 numbers are picked
          return updated.length >= 90 ? [] : updated
        })
        setIsPicking(false)
      }
    }, 40)
  }

  const handlePlayNow = () => {
    if (onPlayNow) {
      onPlayNow()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        handlePickNumber()
      }, 500)
    }
  }


  // Floating numbers animation
  const floatingNumbers = [17, 37, 58, 20, 40]

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="z-10 order-2 lg:order-1">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-main dark:text-white leading-[1.15] mb-6">
            Call Tambola numbers like a pro <br />
            <span className="text-gray-800 dark:text-gray-200">with</span>{' '}
            <span className="font-rounded font-bold text-black dark:text-white">joy.</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-text-sub dark:text-text-dark-sub mb-8 leading-relaxed max-w-lg font-medium">
            A playful caller screen with <span className="text-primary font-semibold">voice</span>, <span className="text-primary font-semibold">slang</span>, <span className="text-primary font-semibold">bento board zones</span>, and <span className="text-primary font-semibold">TV broadcast mode</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handlePlayNow}
              className="px-12 py-4 bg-primary text-white font-display font-bold rounded-full shadow-button hover:bg-primary-hover transition-all text-xl flex items-center justify-center gap-3 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <span className="material-icons-round text-2xl">play_arrow</span>
              Play Now
            </button>
          </div>
          <p className="text-base md:text-lg font-medium text-gray-500 dark:text-gray-400 italic ml-1">
            No hassle searching for physical coins - everything you need is right here.
          </p>
        </div>

        <div className="relative order-1 lg:order-2 h-[500px] flex items-center justify-center">
          {/* Animated Icons */}
          <div
            className={`absolute top-10 right-10 text-yellow-300 cursor-pointer transition-all duration-300 ${
              hoveredIcon === 'star' ? 'animate-pulse scale-125' : 'animate-pulse'
            }`}
            onMouseEnter={() => setHoveredIcon('star')}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handlePickNumber()}
          >
            <span className="material-icons-round text-4xl">star</span>
          </div>
          <div
            className={`absolute bottom-20 left-0 text-yellow-200 cursor-pointer transition-all duration-300 ${
              hoveredIcon === 'sparkle' ? 'rotate-180 scale-125' : 'rotate-slow'
            }`}
            onMouseEnter={() => setHoveredIcon('sparkle')}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handlePickNumber()}
          >
            <span className="material-icons-round text-3xl">auto_awesome</span>
          </div>

          {/* Main Card */}
          <div className="relative w-80 h-[420px] bg-gradient-to-b from-white/40 to-white/10 dark:from-white/10 dark:to-white/5 rounded-[3rem] border-4 border-white/50 dark:border-white/10 shadow-2xl backdrop-blur-sm flex flex-col items-center p-6 z-10 overflow-hidden">
            <div className="absolute top-0 w-[90%] h-6 bg-white/30 dark:bg-white/10 rounded-b-xl border-b border-white/40"></div>

            {/* Floating Number Cards */}
            <div className="absolute top-16 left-4 w-12 h-12 rounded-full bg-pastel-green opacity-80 shadow-inner flex items-center justify-center text-green-700 font-bold cursor-pointer hover:scale-110 transition-transform">
              7
            </div>
            <div className="absolute top-12 right-6 w-14 h-14 rounded-full bg-pastel-orange opacity-80 shadow-inner flex items-center justify-center text-orange-700 font-bold cursor-pointer hover:scale-110 transition-transform">
              6:9
            </div>
            <div className="absolute top-32 left-8 w-10 h-10 rounded-full bg-pastel-red opacity-60 shadow-inner cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute top-24 right-12 w-16 h-16 rounded-full bg-pastel-blue opacity-50 shadow-inner cursor-pointer hover:scale-110 transition-transform"></div>
            <div className="absolute top-40 left-2 w-12 h-12 rounded-full bg-pastel-purple opacity-60 shadow-inner cursor-pointer hover:scale-110 transition-transform"></div>

            {/* Main Number Display */}
            <div className="mt-auto w-full bg-white dark:bg-surface-dark rounded-3xl p-4 shadow-xl text-center relative z-20 mb-4 floating-card border border-white/60 dark:border-gray-700">
              <div className="mb-1">
                <span
                  className={`font-display font-bold text-7xl text-gray-800 dark:text-white tracking-tighter drop-shadow-sm transition-all duration-300 ${
                    isPicking ? 'scale-110 animate-pulse' : ''
                  }`}
                >
                  {currentNumber}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-rounded font-semibold text-gray-500 dark:text-gray-300 text-lg">
                  {getSlang(currentNumber)}
                </span>
              </div>
              <button
                onClick={handlePickNumber}
                disabled={isPicking}
                className="w-full py-4 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-2xl text-white font-display font-black text-2xl tracking-widest shadow-lg btn-3d hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {isPicking ? 'PICKING...' : 'PICK'}
              </button>
            </div>
          </div>

          {/* Floating Number Cards at Bottom */}
          <div className="absolute -bottom-6 w-[120%] h-24 hidden lg:flex items-end justify-center gap-3 z-20 pointer-events-none scale-90 md:scale-100">
            {floatingNumbers.map((num, idx) => (
              <div
                key={idx}
                className="w-16 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg shadow-lg flex items-center justify-center text-orange-800 font-bold transform border-b-4 border-orange-300/50 cursor-pointer hover:scale-110 transition-transform"
                style={{
                  transform: `rotate(${idx % 2 === 0 ? -12 : 12}deg) translateY(${idx * 2}px)`,
                  animation: `bounce-slow ${2 + idx * 0.3}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.2}s`,
                }}
                onClick={() => {
                  setCurrentNumber(num)
                  setPickedNumbers([...pickedNumbers, num])
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero

