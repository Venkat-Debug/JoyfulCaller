import { useState, useEffect } from 'react'

function Settings({ darkMode, toggleDarkMode, settings, onSettingsChange, onClose, onSave }) {
  // Use settings from props, update parent immediately on change
  const updateSetting = (key, value) => {
    if (onSettingsChange) {
      onSettingsChange({ [key]: value })
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
    if (onClose) {
      onClose()
    }
  }

  const handleReset = () => {
    const defaults = {
      voiceEnabled: true,
      voicePersonality: 'Friendly Female (Sarah)',
      callingSpeed: 3,
      slangMode: true,
      speakSlang: false,
      funLevel: 'Playful',
      haptics: true,
      boardShine: true
    }
    if (onSettingsChange) {
      onSettingsChange(defaults)
    }
  }

  const getSpeedLabel = (speed) => {
    if (speed <= 2) return 'Slow'
    if (speed >= 4) return 'Fast'
    return 'Normal'
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4 transition-colors duration-300">
      {/* Animated background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-60 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-yellow-200 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-3xl shadow-soft border-4 border-white dark:border-gray-600 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-700 dark:to-gray-800 p-6 pb-4 flex justify-between items-center border-b border-orange-100 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-gray-600 p-2 rounded-xl shadow-sm text-primary">
              <span className="material-icons-round text-2xl">settings</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white tracking-tight">Game Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span className="material-icons-round text-2xl">close</span>
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Voice Calling Section */}
          <div className="bg-soft-orange dark:bg-gray-700/50 rounded-2xl p-5 border border-orange-100 dark:border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <span className="material-icons-round text-orange-400 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-xl">record_voice_over</span>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">Voice Calling</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Read numbers aloud</p>
                </div>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  id="voice_toggle"
                  checked={settings?.voiceEnabled ?? true}
                  onChange={(e) => updateSetting('voiceEnabled', e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer transition-all duration-300 top-0 left-0 checked:translate-x-6 checked:border-green-400 shadow-sm"
                />
                <label
                  htmlFor="voice_toggle"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                    settings?.voiceEnabled ?? true ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                ></label>
              </div>
            </div>

            <div className="pl-2 pr-2 pt-2 border-t border-orange-200/50 dark:border-gray-600 space-y-4">
              <div className="mt-3">
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-2 ml-1">Voice Personality</label>
                <div className="relative">
                  <select
                    value={settings?.voicePersonality ?? 'Friendly Female (Sarah)'}
                    onChange={(e) => updateSetting('voicePersonality', e.target.value)}
                    className="block w-full bg-white dark:bg-gray-800 border-none text-gray-700 dark:text-gray-200 py-3 px-4 pr-8 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:outline-none appearance-none font-semibold"
                  >
                    <option>Friendly Female (Sarah)</option>
                    <option>Energetic Male (Tom)</option>
                    <option>Robot (B-Boop)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <span className="material-icons-round">expand_more</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 ml-1">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-300">Calling Speed</label>
                  <span className="text-xs font-bold text-primary bg-orange-100 dark:bg-orange-900/50 px-2 py-0.5 rounded-md">
                    {getSpeedLabel(settings?.callingSpeed ?? 3)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400">Slow</span>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={settings?.callingSpeed ?? 3}
                    onChange={(e) => updateSetting('callingSpeed', Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
                  />
                  <span className="text-xs font-bold text-gray-400">Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slang Mode Section */}
          <div className="bg-soft-green dark:bg-gray-700/50 rounded-2xl p-5 border border-green-100 dark:border-gray-600">
            <div className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-green-500 bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-xl">forum</span>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg">Slang Mode</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold leading-tight">
                      Use fun nicknames <br/>(e.g. "Two Fat Ladies")
                    </p>
                  </div>
                </div>
                <div className="relative inline-block w-12 mr-2 mt-1 select-none">
                  <input
                    type="checkbox"
                    id="slang_toggle"
                    checked={settings?.slangMode ?? true}
                    onChange={(e) => updateSetting('slangMode', e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer transition-all duration-300 top-0 left-0 checked:translate-x-6 checked:border-green-400 shadow-sm"
                  />
                  <label
                    htmlFor="slang_toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings?.slangMode ?? true ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  ></label>
                </div>
              </div>

              <div className="flex items-center ml-12 gap-3 mt-2">
                <div className="relative inline-block w-8 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="slang_speak"
                    checked={settings?.speakSlang ?? false}
                    onChange={(e) => updateSetting('speakSlang', e.target.checked)}
                    className="peer absolute block w-4 h-4 rounded-full bg-white border-2 border-gray-300 appearance-none cursor-pointer transition-all duration-300 top-0.5 left-0.5 checked:translate-x-4 checked:border-green-500 shadow-sm"
                  />
                  <label
                    htmlFor="slang_speak"
                    className={`block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings?.speakSlang ?? false ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  ></label>
                </div>
                <label htmlFor="slang_speak" className="text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer select-none">
                  Speak slang too?
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-green-200/50 dark:border-gray-600">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300 mb-3 ml-1">Fun Level</label>
              <div className="bg-gray-200/50 dark:bg-gray-800 p-1 rounded-xl flex relative">
                <button
                  onClick={() => updateSetting('funLevel', 'Calm')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all focus:outline-none ${
                    (settings?.funLevel ?? 'Playful') === 'Calm'
                      ? 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 shadow-sm transform scale-105'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Calm 😌
                </button>
                <button
                  onClick={() => updateSetting('funLevel', 'Playful')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all focus:outline-none ${
                    (settings?.funLevel ?? 'Playful') === 'Playful'
                      ? 'text-green-600 bg-white dark:bg-gray-600 dark:text-green-300 shadow-sm transform scale-105'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Playful 🥳
                </button>
              </div>
            </div>
          </div>

          {/* Haptics and Board Shine */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-100 dark:border-gray-600 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons-round text-purple-400 text-lg">vibration</span>
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Haptics</h3>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-400 font-semibold">Vibrate on call</span>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="haptics"
                    checked={settings?.haptics ?? true}
                    onChange={(e) => updateSetting('haptics', e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer transition-all duration-300 top-0 left-0 checked:translate-x-5 checked:border-green-400 shadow-sm"
                  />
                  <label
                    htmlFor="haptics"
                    className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings?.haptics ?? true ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  ></label>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 border border-gray-100 dark:border-gray-600 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-icons-round text-yellow-400 text-lg">auto_awesome</span>
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Board Shine</h3>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs text-gray-400 font-semibold">Glow effects</span>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="shine"
                    checked={settings?.boardShine ?? true}
                    onChange={(e) => updateSetting('boardShine', e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-gray-200 appearance-none cursor-pointer transition-all duration-300 top-0 left-0 checked:translate-x-5 checked:border-green-400 shadow-sm"
                  />
                  <label
                    htmlFor="shine"
                    className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300 ${
                      settings?.boardShine ?? true ? 'bg-green-400' : 'bg-gray-200'
                    }`}
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-2 bg-white dark:bg-surface-dark border-t border-gray-50 dark:border-gray-700">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-b from-primary to-primary-hover text-white font-extrabold py-4 px-6 rounded-2xl shadow-3d hover:shadow-3d-hover hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 text-lg"
          >
            <span className="material-icons-round">check_circle</span>
            Save & Play
          </button>
          <div className="text-center mt-3">
            <button
              onClick={handleReset}
              className="text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

