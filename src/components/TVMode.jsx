import { useState, useEffect, useRef } from 'react'

const TVMode = ({ 
  darkMode, 
  toggleDarkMode, 
  onNavigateBack,
  onNavigateSettings,
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
      return null
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
      handleReset()
      return
    }
    
    setIsPicking(true)
    
    let iterations = 0
    const interval = setInterval(() => {
      const num = generateRandomNumber()
      if (num) {
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
            if (prev.length === 0) {
              return [finalNumber]
            } else if (prev.length === 1) {
              return [prev[0], finalNumber]
            } else {
              return [prev[prev.length - 2], prev[prev.length - 1], finalNumber]
            }
          })
          speakNumber(finalNumber, getSlang(finalNumber))
          
          // Haptics feedback when number is picked
          if (settings?.haptics && navigator.vibrate) {
            navigator.vibrate([50, 30, 50])
          }
        }
        setIsPicking(false)
      }
    }, 40)
  }

  const handleReset = () => {
    setCurrentNumber(null)
    setCalledNumbers([])
    setLastThree([])
    setIsPicking(false)
  }

  const remaining = 99 - calledNumbers.length

  return (
    <div className="bg-background-light-tv dark:bg-background-dark-tv text-slate-800 dark:text-slate-100 h-screen w-screen overflow-hidden flex flex-col transition-colors duration-300 font-display-tv">
      {/* Mobile Warning */}
      <div className="lg:hidden fixed inset-0 bg-background-light-tv dark:bg-background-dark-tv z-50 flex flex-col items-center justify-center p-8 text-center">
        <span className="material-icons-round text-6xl text-primary-tv mb-4">desktop_windows</span>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Please use Desktop</h2>
        <p className="text-slate-500">The TV Broadcast mode is optimized for landscape screens. Please rotate your device or use a larger screen.</p>
        <button
          onClick={onNavigateBack}
          className="mt-6 px-6 py-3 bg-primary-tv text-white rounded-xl font-bold hover:bg-orange-500 transition-colors flex items-center gap-2"
        >
          <span className="material-icons-round">exit_to_app</span>
          Exit TV Mode
        </button>
      </div>

      {/* Header */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 lg:px-8 z-20 relative bg-background-light-tv dark:bg-background-dark-tv">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onNavigateBack}
        >
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-primary-tv">
            <span className="material-icons-round text-2xl">bolt</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            Joyful <span className="text-primary-tv">Caller</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-surface-dark-tv transition text-slate-500 dark:text-slate-300"
          >
            <span className="material-icons-round dark:hidden">dark_mode</span>
            <span className="material-icons-round hidden dark:block">light_mode</span>
          </button>
          <button 
            onClick={onNavigateSettings}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-dark-tv rounded-full text-sm font-bold shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition"
          >
            <span className="material-icons-round text-base text-slate-400">settings</span>
            <span>Settings</span>
          </button>
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-tv text-white rounded-full text-sm font-bold shadow-lg hover:bg-orange-500 hover:shadow-xl transition-all relative z-[100] opacity-100"
            style={{ backgroundColor: '#FB923C', color: '#FFFFFF' }}
          >
            <span className="material-icons-round text-lg">exit_to_app</span>
            <span className="font-bold">Exit TV Mode</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Panel */}
        <section className="flex lg:col-span-5 flex-col gap-2 relative h-full min-h-0">
          {/* Remaining Counter */}
          <div className="shrink-0 relative rounded-xl bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-slate-800/30 dark:to-slate-900/30 border border-white/50 dark:border-white/5 flex flex-col items-center justify-center overflow-hidden shadow-inner" style={{ height: '25%' }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <div className="w-full h-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
            </div>
            <div className="relative w-16 h-16 bg-white/20 dark:bg-white/5 backdrop-blur-md rounded-full border-2 border-white/40 dark:border-white/10 shadow-xl flex items-center justify-center">
              <span className="material-icons-round text-3xl text-primary-tv/40 animate-pulse">casino</span>
            </div>
            <p className="mt-1 text-slate-400 dark:text-slate-500 font-semibold text-xs uppercase tracking-widest">
              Remaining: {remaining}
            </p>
          </div>

          {/* Current Number Display */}
          <div className="flex-1 min-h-0 relative">
            <div className="absolute inset-0 bg-white dark:bg-surface-dark-tv rounded-xl shadow-soft dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center p-3 z-10">
              <span className="absolute top-2 right-2 text-yellow-400 material-icons-round text-lg animate-bounce">auto_awesome</span>
              <span className="absolute bottom-2 left-2 text-pink-300 material-icons-round text-base">star</span>
              <div className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-0.5 text-[10px]">Current Call</div>
              {currentNumber === null || currentNumber === undefined ? (
                <>
                  <div className="text-[4rem] md:text-[5rem] leading-none font-extrabold text-slate-300 dark:text-slate-600 drop-shadow-sm">?</div>
                  <div className="mt-1 px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full font-bold text-sm lg:text-base border border-slate-100 dark:border-slate-700">
                    Ready to Start
                  </div>
                </>
              ) : (
                <>
                  <div 
                    className="text-[4rem] md:text-[5rem] leading-none font-extrabold drop-shadow-sm"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #FB923C, #F59E0B)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: '#FB923C',
                      display: 'inline-block'
                    }}
                  >
                    {currentNumber || '?'}
                  </div>
                  <div className="mt-1 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 rounded-full font-bold text-sm lg:text-base border border-orange-100 dark:border-orange-900/30">
                    {getSlang(currentNumber)}
                  </div>
                </>
              )}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-300 to-yellow-300 opacity-30 blur-xl rounded-xl -z-10"></div>
          </div>

          {/* Pick Button */}
          <div className="h-14 shrink-0 w-full">
            <button
              onClick={handlePickNumber}
              disabled={isPicking}
              className="w-full h-full bg-gradient-to-r from-primary-tv to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white rounded-xl shadow-lg shadow-orange-500/30 transform transition active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: currentNumber === null ? '#FB923C' : undefined }}
            >
              <div className="bg-white/20 p-1 rounded-full group-hover:rotate-180 transition duration-500">
                <span className="material-icons-round text-xl">
                  {isPicking ? 'hourglass_empty' : calledNumbers.length === 0 ? 'play_arrow' : 'cached'}
                </span>
              </div>
              <span className="text-base md:text-lg font-extrabold tracking-wide uppercase">
                {isPicking ? 'Picking...' : calledNumbers.length === 0 ? 'Start' : 'Pick Next'}
              </span>
            </button>
          </div>
        </section>

        {/* Right Panel - Board */}
        <section className="col-span-1 lg:col-span-7 h-full flex flex-col relative bg-white/50 dark:bg-surface-dark-tv/50 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 p-2 lg:p-3 shadow-sm min-h-0">
          <div className="flex justify-between items-start mb-2 shrink-0">
            <div>
              <h2 className="text-base font-bold text-slate-700 dark:text-slate-200">Board Overview</h2>
              <p className="text-xs text-slate-400">1-99 Standard Tambola</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Previous</span>
              <div className="flex gap-1.5">
                {lastThree.length === 0 ? (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs opacity-50"></div>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs opacity-50"></div>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-xs opacity-50"></div>
                  </>
                ) : (
                  lastThree.map((num, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        idx === lastThree.length - 1
                          ? 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm text-slate-600 dark:text-slate-200 text-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {num}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Number Grid */}
          <div className="flex-1 grid grid-cols-10 gap-1 min-h-0 pb-16" style={{ gridAutoRows: 'minmax(0, 1fr)', height: '100%' }}>
            {Array.from({ length: 99 }, (_, i) => i + 1).map((num) => {
              const isPicked = calledNumbers.includes(num)
              const isCurrent = currentNumber !== null && currentNumber !== undefined && currentNumber === num
              
              return (
                <div
                  key={num}
                  className={`number-cell rounded-lg flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-primary-tv text-white shadow-glow ring-2 ring-orange-200 dark:ring-orange-900 z-10 animate-pulse'
                      : isPicked
                      ? 'bg-gradient-to-br from-primary-tv to-orange-400 text-white shadow-md transform scale-105 border-none'
                      : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                  style={isCurrent ? {
                    backgroundColor: '#FB923C',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(251, 146, 60, 0.5)'
                  } : isPicked && !isCurrent ? {
                    background: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)',
                    color: '#FFFFFF'
                  } : {}}
                >
                  {num}
                </div>
              )
            })}
          </div>

          {/* Reset Button */}
          <div className="absolute bottom-3 right-3 z-20">
            <button
              onClick={handleReset}
              className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-bold py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm transition border border-slate-200 dark:border-slate-600 text-sm"
            >
              <span className="material-icons-round text-lg">restart_alt</span>
              <span>Reset</span>
            </button>
          </div>

          {/* Background Decorations */}
          <div className="absolute inset-x-6 top-20 bottom-6 -z-10 grid grid-rows-3 gap-4 pointer-events-none opacity-50">
            <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl"></div>
            <div className="bg-yellow-50/50 dark:bg-yellow-900/10 rounded-3xl"></div>
            <div className="bg-pink-50/50 dark:bg-pink-900/10 rounded-3xl"></div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default TVMode

