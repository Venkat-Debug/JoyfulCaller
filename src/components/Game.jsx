import { useState, useEffect, useRef } from 'react'
import GameBoard from './GameBoard'

const Game = ({ 
  darkMode, 
  toggleDarkMode, 
  onNewGame, 
  onNavigateHome, 
  onNavigateTV,
  onNavigateSettings,
  onSettingsChange,
  currentNumber,
  setCurrentNumber,
  calledNumbers,
  setCalledNumbers,
  lastThree,
  setLastThree,
  settings,
  onActivity
}) => {
  const [isPicking, setIsPicking] = useState(false)
  const [resetProgress, setResetProgress] = useState(0)
  const resetTimerRef = useRef(null)
  const resetIntervalRef = useRef(null)

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
    51: "Tweak of the Thumb",
    55: "All the Fives",
    60: "Five Dozen",
    66: "Clickety Click",
    69: "Either Way Up",
    70: "Three Score and Ten",
    77: "Two Little Crutches",
    80: "Eight and Blank",
    88: "Two Fat Ladies",
    90: "Top of the Shop",
    91: "Top of the House",
    92: "Nelson's Column",
    93: "All the Threes",
    94: "All the Fours",
    95: "All the Fives",
    96: "All the Sixes",
    97: "All the Sevens",
    98: "All the Eights",
    99: "All the Nines",
  }

  const getSlang = (num) => {
    if (!settings?.slangMode) {
      return `Number ${num}`
    }
    return tambolaSlang[num] || `Number ${num}`
  }

  const speakNumber = (number, slang) => {
    if (!settings?.voiceEnabled) return
    
    if ('speechSynthesis' in window) {
      // Stop any queued/ongoing speech to avoid double reads
      speechSynthesis.cancel()

      // Get voice personality settings
      const personality = settings?.voicePersonality || 'Friendly Female (Sarah)'
      const speed = settings?.callingSpeed || 3
      const speakSlang = settings?.speakSlang || false
      
      // Calculate rate based on speed (1-5 scale, 0.7-1.3 rate)
      const rate = 0.7 + (speed - 1) * 0.15
      
      // Set pitch based on personality
      let pitch = 1.0
      if (personality.includes('Female')) {
        pitch = 1.2
      } else if (personality.includes('Male')) {
        pitch = 0.9
      } else if (personality.includes('Robot')) {
        pitch = 0.8
      }
      
      // Build the text to speak
      let textToSpeak = `${number}`
      if (speakSlang && settings?.slangMode) {
        textToSpeak += ` - ${slang}`
      }
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.rate = rate
      utterance.pitch = pitch
      
      // Try to select voice based on personality (if voices are already available).
      // IMPORTANT: Do not speak twice (some browsers populate voices async and trigger onvoiceschanged).
      const voices = speechSynthesis.getVoices()
      if (voices.length > 0) {
        if (personality.includes('Female')) {
          const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Karen'))
          if (femaleVoice) utterance.voice = femaleVoice
        } else if (personality.includes('Male')) {
          const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Alex') || v.name.includes('Daniel'))
          if (maleVoice) utterance.voice = maleVoice
        }
      }

      speechSynthesis.speak(utterance)
      
      // Haptics feedback
      if (settings?.haptics && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
  }

  const generateRandomNumber = () => {
    const available = Array.from({ length: 99 }, (_, i) => i + 1).filter(
      (n) => !calledNumbers.includes(n)
    )
    if (available.length === 0) {
      return null // All numbers called
    }
    return available[Math.floor(Math.random() * available.length)]
  }

  const handlePickNumber = () => {
    if (isPicking) return
    
    // Track activity
    if (onActivity) {
      onActivity()
    }
    
    // Haptics feedback on button press
    if (settings?.haptics && navigator.vibrate) {
      navigator.vibrate(30)
    }
    
    const newNumber = generateRandomNumber()
    if (newNumber === null) {
      alert('All numbers have been called! Starting new game...')
      handleNewGame()
      return
    }
    
    // On the very first "START", speak in the same click (some browsers block speech if it only happens later in timers).
    if (calledNumbers.length === 0) {
      setIsPicking(true)
      setCurrentNumber(newNumber)
      setCalledNumbers((prev) => [...prev, newNumber])
      setLastThree([newNumber])
      speakNumber(newNumber, getSlang(newNumber))
      setTimeout(() => setIsPicking(false), 350)
      return
    }

    setIsPicking(true)
    
    // Animate through numbers quickly
    let iterations = 0
    const tempNumbers = new Set()
    const interval = setInterval(() => {
      const num = generateRandomNumber()
      if (num) {
        tempNumbers.add(num)
        setCurrentNumber(num)
      }
      iterations++
      if (iterations > 15) {
        clearInterval(interval)
        const finalNumber = generateRandomNumber()
        if (finalNumber) {
          setCurrentNumber(finalNumber)
          setCalledNumbers((prev) => [...prev, finalNumber])
          setLastThree((prev) => {
            // Keep only the last 3 numbers
            if (prev.length === 0) {
              return [finalNumber]
            } else if (prev.length === 1) {
              return [prev[0], finalNumber]
            } else {
              // Take the last 2 numbers and add the new one
              return [prev[prev.length - 2], prev[prev.length - 1], finalNumber]
            }
          })
          speakNumber(finalNumber, getSlang(finalNumber))
          
          // Haptics feedback when number is picked
          if (settings?.haptics && navigator.vibrate) {
            navigator.vibrate([50, 30, 50])
          }
        } else {
          // If no number generated, ensure currentNumber stays visible
          setIsPicking(false)
        }
        setIsPicking(false)
      }
    }, 40)
  }

  const handleRepeatVoice = () => {
    if (currentNumber !== null) {
      // Track activity
      if (onActivity) {
        onActivity()
      }
      
      // Haptics feedback on repeat
      if (settings?.haptics && navigator.vibrate) {
        navigator.vibrate(30)
      }
      speakNumber(currentNumber, getSlang(currentNumber))
    }
  }

  const handleResetGame = () => {
    setCurrentNumber(null)
    setCalledNumbers([])
    setLastThree([])
    setIsPicking(false)
  }
  
  const handleNewGame = () => {
    // Reset game and navigate to home
    handleResetGame()
    if (onNewGame) {
      onNewGame()
    }
  }

  const handleResetMouseDown = () => {
    setResetProgress(0)
    resetTimerRef.current = setTimeout(() => {
      resetIntervalRef.current = setInterval(() => {
        setResetProgress((prev) => {
          if (prev >= 100) {
            clearInterval(resetIntervalRef.current)
            handleNewGame()
            return 0
          }
          return prev + 2
        })
      }, 20)
    }, 300) // Start progress after 300ms hold
  }

  const handleResetMouseUp = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current)
    }
    if (resetIntervalRef.current) {
      clearInterval(resetIntervalRef.current)
    }
    setResetProgress(0)
  }

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
      if (resetIntervalRef.current) clearInterval(resetIntervalRef.current)
    }
  }, [])

  return (
    <div className="bg-background-light dark:bg-background-dark-game text-slate-800 dark:text-slate-100 font-display min-h-screen transition-colors duration-300 antialiased overflow-x-hidden w-full">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (onNavigateHome) {
              onNavigateHome()
            }
          }}
        >
          <div className="w-8 h-8 rounded-full bg-primary-game flex items-center justify-center text-white font-bold shadow-lg hover:scale-110 transition-transform">
            <span className="material-icons-round text-lg">bolt</span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-orange-400 dark:text-orange-300">
            Joyful Caller
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400"
            aria-label="Toggle dark mode"
          >
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block">light_mode</span>
          </button>
          <button 
            onClick={onNavigateTV}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-game dark:hover:text-primary-game transition-colors"
          >
            <span className="material-icons-round text-base">tv</span>
            TV Mode
          </button>
          <button 
            onClick={onNavigateSettings}
            className="hidden md:block px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary-game dark:hover:text-primary-game transition-colors"
          >
            Settings
          </button>
          <button
            onClick={handleResetGame}
            className="bg-primary-game text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-orange-500/30 hover:bg-orange-600 transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            New Game
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full overflow-x-hidden w-full">
        {/* Left Panel - Current Call */}
        <section className="lg:col-span-4 flex flex-col gap-6 relative z-10">
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-[2.5rem] p-6 flex flex-col items-center justify-between overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5 bg-gradient-to-br from-white to-orange-50 dark:from-surface-dark dark:to-slate-900">
            {/* Background Decorations */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-[10%] left-[-10%] w-[200px] h-[200px] bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-[50px]"></div>
              <div className="absolute top-8 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-50"></div>
            </div>
            <div className="absolute top-12 left-8 w-12 h-12 bg-yellow-200 dark:bg-yellow-600/30 rounded-full blur-sm opacity-60 rotate-12 animate-pulse"></div>
            <div className="absolute bottom-32 right-6 w-16 h-16 bg-orange-200 dark:bg-orange-600/30 rounded-full blur-md opacity-50 -rotate-6 animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Current Call Label */}
            <div className="z-10 w-full flex justify-center pt-2">
              <span className="px-4 py-1 rounded-full bg-white/60 dark:bg-black/20 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 backdrop-blur-sm border border-white/40 dark:border-white/5">
                Current Call
              </span>
            </div>

            {/* Number Display */}
            <div className="z-10 flex-1 flex flex-col items-center justify-center w-full">
              <div className={`bg-white/80 dark:bg-surface-dark-lighter/80 backdrop-blur-xl border border-white dark:border-slate-600 shadow-soft dark:shadow-none rounded-[2rem] p-8 w-full max-w-[280px] aspect-square flex flex-col items-center justify-center transform transition-transform hover:scale-[1.02] duration-300 group cursor-pointer ${
                !isPicking && currentNumber !== null ? 'pop-in' : ''
              }`}>
                <div className="absolute top-4 w-12 h-2 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                {currentNumber === null ? (
                  <>
                    <div className="text-[4rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500 drop-shadow-sm opacity-50">
                      ?
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="font-bold text-slate-400 dark:text-slate-500 text-lg">
                        Ready to Start
                      </h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`text-[7rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-pink-500 drop-shadow-sm transition-all ${
                      isPicking ? 'scale-110 animate-pulse' : ''
                    }`}>
                      {currentNumber}
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg group-hover:text-primary-game transition-colors">
                        {getSlang(currentNumber)}
                      </h3>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Pick Button */}
            <div className="z-10 w-full mt-4">
              <button
                onClick={handlePickNumber}
                disabled={isPicking}
                className="w-full relative group"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-orange-600 rounded-2xl transform translate-y-2 transition-transform group-hover:translate-y-3"></div>
                <div className={`relative bg-gradient-to-b from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white text-2xl font-black py-5 px-8 rounded-2xl shadow-glow transition-transform transform group-active:translate-y-2 group-active:shadow-none flex items-center justify-center gap-3 ${
                  isPicking ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  <span>
                    {isPicking 
                      ? 'PICKING...' 
                      : calledNumbers.length === 0 
                        ? 'START' 
                        : 'PICK NEXT'
                    }
                  </span>
                  <span className="material-icons-round bg-white/20 rounded-full p-1 text-base">
                    {isPicking 
                      ? 'hourglass_empty' 
                      : calledNumbers.length === 0 
                        ? 'play_arrow' 
                        : 'arrow_forward'
                    }
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Last Three & Controls */}
          <div className="glass-panel p-4 rounded-3xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase w-12 leading-tight">
                Last<br />Three
              </span>
              <div className="flex gap-2">
                {lastThree.length === 0 ? (
                  <>
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-50"></div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-50"></div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-50"></div>
                  </>
                ) : (
                  lastThree.map((num, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
                        idx === lastThree.length - 1
                          ? 'bg-white dark:bg-slate-700 text-slate-600 dark:text-white shadow-sm border-slate-200 dark:border-slate-600 scale-110'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {num.toString().padStart(2, '0')}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (onActivity) onActivity()
                  if (settings?.haptics && navigator.vibrate) navigator.vibrate(20)
                  if (onSettingsChange) {
                    onSettingsChange({ voiceEnabled: !(settings?.voiceEnabled ?? true) })
                  }
                }}
                className={`w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark-lighter hover:bg-orange-50 dark:hover:bg-slate-700 flex items-center justify-center transition-colors border border-slate-100 dark:border-slate-700 shadow-sm ${
                  settings?.voiceEnabled ? 'text-primary-game' : 'text-slate-400'
                }`}
                title="Toggle Voice"
              >
                <span className="material-icons-round">
                  {settings?.voiceEnabled ? 'volume_up' : 'volume_off'}
                </span>
              </button>
              <button
                onClick={handleRepeatVoice}
                disabled={currentNumber === null}
                className={`w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark-lighter hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center transition-colors border border-slate-100 dark:border-slate-700 shadow-sm ${
                  currentNumber === null 
                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed' 
                    : 'text-blue-500 hover:text-blue-600 dark:text-blue-400'
                }`}
                title="Repeat Last Number"
              >
                <span className="material-icons-round">replay</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Panel - Game Board */}
        <section className="lg:col-span-8 flex flex-col gap-6 sticky md:relative top-0 md:top-auto bg-background-light dark:bg-background-dark z-30 md:z-auto max-h-screen md:max-h-none overflow-y-auto overflow-x-hidden md:overflow-y-visible md:overflow-x-visible w-full">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Game Board</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                99 numbers organized in friendly zones
              </p>
            </div>
            <div className="bg-white dark:bg-surface-dark-lighter px-4 py-2 rounded-full shadow-sm text-sm font-bold flex gap-3 border border-slate-100 dark:border-slate-700">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-600"></span> Remaining
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Called
              </span>
            </div>
          </div>

          <GameBoard calledNumbers={calledNumbers} settings={settings} />
        </section>
      </main>

      {/* Bottom Gradient Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-primary-game opacity-50 z-50"></div>
    </div>
  )
}

export default Game

