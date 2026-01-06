import { useState, useEffect, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Game from './components/Game'
import TVMode from './components/TVMode'
import Settings from './components/Settings'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or default to system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  // Restore current screen from localStorage, or default to 'home'
  // If there's active game data, automatically show game screen
  const [currentScreen, setCurrentScreen] = useState(() => {
    const saved = localStorage.getItem('currentScreen')
    if (saved && (saved === 'game' || saved === 'tv' || saved === 'settings')) {
      return saved
    }
    // Check if there's active game data - if so, show game screen
    const gameState = localStorage.getItem('gameState')
    if (gameState) {
      try {
        const state = JSON.parse(gameState)
        const lastActivity = state.lastActivity ? new Date(state.lastActivity).getTime() : 0
        const now = Date.now()
        const INACTIVITY_TIMEOUT = 5 * 60 * 1000
        
        // If game data exists and is recent, show game screen
        if (now - lastActivity <= INACTIVITY_TIMEOUT && (state.currentNumber !== null || (state.calledNumbers && state.calledNumbers.length > 0))) {
          return 'game'
        }
      } catch (e) {
        // If parsing fails, default to home
      }
    }
    return 'home'
  })
  
  // Shared game state - load from localStorage with activity timestamp check
  const [currentNumber, setCurrentNumber] = useState(() => {
    const saved = localStorage.getItem('gameState')
    if (saved) {
      try {
        const gameState = JSON.parse(saved)
        const lastActivity = gameState.lastActivity ? new Date(gameState.lastActivity).getTime() : 0
        const now = Date.now()
        const INACTIVITY_TIMEOUT = 5 * 60 * 1000 // 5 minutes
        
        // If last activity was more than 5 minutes ago, reset
        if (now - lastActivity > INACTIVITY_TIMEOUT) {
          localStorage.removeItem('gameState')
          return null
        }
        return gameState.currentNumber || null
      } catch (e) {
        return null
      }
    }
    return null
  })
  
  const [calledNumbers, setCalledNumbers] = useState(() => {
    const saved = localStorage.getItem('gameState')
    if (saved) {
      try {
        const gameState = JSON.parse(saved)
        const lastActivity = gameState.lastActivity ? new Date(gameState.lastActivity).getTime() : 0
        const now = Date.now()
        const INACTIVITY_TIMEOUT = 5 * 60 * 1000
        
        if (now - lastActivity > INACTIVITY_TIMEOUT) {
          localStorage.removeItem('gameState')
          return []
        }
        return gameState.calledNumbers || []
      } catch (e) {
        return []
      }
    }
    return []
  })
  
  const [lastThree, setLastThree] = useState(() => {
    const saved = localStorage.getItem('gameState')
    if (saved) {
      try {
        const gameState = JSON.parse(saved)
        const lastActivity = gameState.lastActivity ? new Date(gameState.lastActivity).getTime() : 0
        const now = Date.now()
        const INACTIVITY_TIMEOUT = 5 * 60 * 1000
        
        if (now - lastActivity > INACTIVITY_TIMEOUT) {
          localStorage.removeItem('gameState')
          return []
        }
        return gameState.lastThree || []
      } catch (e) {
        return []
      }
    }
    return []
  })
  
  // Inactivity timer ref
  const inactivityTimerRef = useRef(null)
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000 // 5 minutes in milliseconds
  
  // Settings state - load from localStorage or use defaults
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gameSettings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        // If parsing fails, use defaults
      }
    }
    return {
      voiceEnabled: true,
      voicePersonality: 'Friendly Female (Sarah)',
      callingSpeed: 3,
      slangMode: true,
      speakSlang: false,
      funLevel: 'Playful',
      haptics: true,
      boardShine: true
    }
  })

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings))
  }, [settings])

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const gameState = {
      currentNumber,
      calledNumbers,
      lastThree,
      lastActivity: new Date().toISOString()
    }
    localStorage.setItem('gameState', JSON.stringify(gameState))
    
    // Also save current screen if we're on game or tv screen (to maintain screen on refresh)
    if (currentScreen === 'game' || currentScreen === 'tv') {
      localStorage.setItem('currentScreen', currentScreen)
    }
  }, [currentNumber, calledNumbers, lastThree, currentScreen])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const navigateToGame = () => {
    setCurrentScreen('game')
    localStorage.setItem('currentScreen', 'game')
  }

  const navigateToHome = () => {
    setCurrentScreen('home')
    localStorage.setItem('currentScreen', 'home')
  }

  const navigateToTV = () => {
    setCurrentScreen('tv')
    localStorage.setItem('currentScreen', 'tv')
  }

  const navigateToSettings = () => {
    setCurrentScreen('settings')
    localStorage.setItem('currentScreen', 'settings')
  }

  const navigateBackFromSettings = () => {
    // Go back to the previous screen (game or home)
    if (currentNumber !== null || calledNumbers.length > 0) {
      setCurrentScreen('game')
      localStorage.setItem('currentScreen', 'game')
    } else {
      setCurrentScreen('home')
      localStorage.setItem('currentScreen', 'home')
    }
  }

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const handleNewGame = () => {
    setCurrentNumber(null)
    setCalledNumbers([])
    setLastThree([])
    localStorage.removeItem('gameState')
    navigateToHome()
    resetInactivityTimer()
  }

  // Reset game data due to inactivity
  const resetGameData = () => {
    setCurrentNumber(null)
    setCalledNumbers([])
    setLastThree([])
    localStorage.removeItem('gameState')
    // Don't navigate, just reset the data
  }

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    
    // Only set timer if there's active game data
    if (currentNumber !== null || calledNumbers.length > 0) {
      inactivityTimerRef.current = setTimeout(() => {
        resetGameData()
      }, INACTIVITY_TIMEOUT)
    }
  }, [currentNumber, calledNumbers.length])

  // Track activity and reset timer
  useEffect(() => {
    // Reset timer on any game state change (activity)
    resetInactivityTimer()
    
    // Cleanup on unmount
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [resetInactivityTimer])

  // Track user interactions (clicks, touches, keyboard)
  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer()
    }

    // Listen to various user activities
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [resetInactivityTimer])

  if (currentScreen === 'settings') {
    return (
      <Settings
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        settings={settings}
        onSettingsChange={updateSettings}
        onClose={navigateBackFromSettings}
        onSave={navigateBackFromSettings}
      />
    )
  }

  if (currentScreen === 'game') {
    return (
      <Game 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onNewGame={handleNewGame} 
        onNavigateHome={navigateToHome} 
        onNavigateTV={navigateToTV}
        onNavigateSettings={navigateToSettings}
        onSettingsChange={updateSettings}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
        calledNumbers={calledNumbers}
        setCalledNumbers={setCalledNumbers}
        lastThree={lastThree}
        setLastThree={setLastThree}
        settings={settings}
        onActivity={resetInactivityTimer}
      />
    )
  }

  if (currentScreen === 'tv') {
    return (
      <TVMode 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onNavigateBack={navigateToGame}
        onNavigateSettings={navigateToSettings}
        onNewGame={handleNewGame}
        onSettingsChange={updateSettings}
        currentNumber={currentNumber}
        setCurrentNumber={setCurrentNumber}
        calledNumbers={calledNumbers}
        setCalledNumbers={setCalledNumbers}
        lastThree={lastThree}
        setLastThree={setLastThree}
        settings={settings}
        onActivity={resetInactivityTimer}
      />
    )
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-body transition-colors duration-300 min-h-screen">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} onNavigateSettings={navigateToSettings} />
      <Hero onPlayNow={navigateToGame} />
      <Features />
    </div>
  )
}

export default App

