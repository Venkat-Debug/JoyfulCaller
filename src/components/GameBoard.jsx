import { useMemo } from 'react'

const GameBoard = ({ calledNumbers, settings }) => {
  const zones = useMemo(() => {
    return [
      {
        name: 'Single Digits',
        range: [1, 10],
        color: 'orange',
        count: calledNumbers.filter(n => n >= 1 && n <= 10).length,
      },
      {
        name: 'Teens',
        range: [11, 20],
        color: 'blue',
        count: calledNumbers.filter(n => n >= 11 && n <= 20).length,
      },
      {
        name: 'Twenties',
        range: [21, 30],
        color: 'purple',
        count: calledNumbers.filter(n => n >= 21 && n <= 30).length,
      },
      {
        name: 'Thirties',
        range: [31, 40],
        color: 'pink',
        count: calledNumbers.filter(n => n >= 31 && n <= 40).length,
      },
      {
        name: 'Forties',
        range: [41, 50],
        color: 'teal',
        count: calledNumbers.filter(n => n >= 41 && n <= 50).length,
      },
      {
        name: 'Fifties',
        range: [51, 60],
        color: 'indigo',
        count: calledNumbers.filter(n => n >= 51 && n <= 60).length,
      },
      {
        name: 'Sixties',
        range: [61, 70],
        color: 'amber',
        count: calledNumbers.filter(n => n >= 61 && n <= 70).length,
      },
      {
        name: 'Seventies',
        range: [71, 80],
        color: 'rose',
        count: calledNumbers.filter(n => n >= 71 && n <= 80).length,
      },
      {
        name: 'Eighties',
        range: [81, 90],
        color: 'cyan',
        count: calledNumbers.filter(n => n >= 81 && n <= 90).length,
      },
    ]
  }, [calledNumbers])

  const getNumberStatus = (num) => {
    if (calledNumbers.includes(num)) {
      // Check if it's the most recent (last called)
      const isMostRecent = calledNumbers.length > 0 && calledNumbers[calledNumbers.length - 1] === num
      return isMostRecent ? 'current' : 'called'
    }
    return 'available'
  }

  const renderZone = (zone) => {
    const numbers = Array.from({ length: zone.range[1] - zone.range[0] + 1 }, (_, i) => zone.range[0] + i)
    const colorClasses = {
      orange: {
        bg: 'bg-orange-50 dark:bg-slate-800/50',
        border: 'border-orange-100 dark:border-slate-700',
        text: 'text-orange-900 dark:text-orange-200',
        badge: 'bg-orange-200 dark:bg-orange-900/50',
        badgeText: 'text-orange-700 dark:text-orange-300',
      },
      blue: {
        bg: 'bg-blue-50 dark:bg-slate-800/50',
        border: 'border-blue-100 dark:border-slate-700',
        text: 'text-blue-900 dark:text-blue-200',
        badge: 'bg-blue-200 dark:bg-blue-900/50',
        badgeText: 'text-blue-700 dark:text-blue-300',
      },
      purple: {
        bg: 'bg-purple-50 dark:bg-slate-800/50',
        border: 'border-purple-100 dark:border-slate-700',
        text: 'text-purple-900 dark:text-purple-200',
        badge: 'bg-purple-200 dark:bg-purple-900/50',
        badgeText: 'text-purple-700 dark:text-purple-300',
      },
      pink: {
        bg: 'bg-pink-50 dark:bg-slate-800/50',
        border: 'border-pink-100 dark:border-slate-700',
        text: 'text-pink-900 dark:text-pink-200',
        badge: 'bg-pink-200 dark:bg-pink-900/50',
        badgeText: 'text-pink-700 dark:text-pink-300',
      },
      teal: {
        bg: 'bg-teal-50 dark:bg-slate-800/50',
        border: 'border-teal-100 dark:border-slate-700',
        text: 'text-teal-900 dark:text-teal-200',
        badge: 'bg-teal-200 dark:bg-teal-900/50',
        badgeText: 'text-teal-700 dark:text-teal-300',
      },
      indigo: {
        bg: 'bg-indigo-50 dark:bg-slate-800/50',
        border: 'border-indigo-100 dark:border-slate-700',
        text: 'text-indigo-900 dark:text-indigo-200',
        badge: 'bg-indigo-200 dark:bg-indigo-900/50',
        badgeText: 'text-indigo-700 dark:text-indigo-300',
      },
      amber: {
        bg: 'bg-amber-50 dark:bg-slate-800/50',
        border: 'border-amber-100 dark:border-slate-700',
        text: 'text-amber-900 dark:text-amber-200',
        badge: 'bg-amber-200 dark:bg-amber-900/50',
        badgeText: 'text-amber-700 dark:text-amber-300',
      },
      rose: {
        bg: 'bg-rose-50 dark:bg-slate-800/50',
        border: 'border-rose-100 dark:border-slate-700',
        text: 'text-rose-900 dark:text-rose-200',
        badge: 'bg-rose-200 dark:bg-rose-900/50',
        badgeText: 'text-rose-700 dark:text-rose-300',
      },
      cyan: {
        bg: 'bg-cyan-50 dark:bg-slate-800/50',
        border: 'border-cyan-100 dark:border-slate-700',
        text: 'text-cyan-900 dark:text-cyan-200',
        badge: 'bg-cyan-200 dark:bg-cyan-900/50',
        badgeText: 'text-cyan-700 dark:text-cyan-300',
      },
      emerald: {
        bg: 'bg-emerald-50 dark:bg-slate-800/50',
        border: 'border-emerald-100 dark:border-slate-700',
        text: 'text-emerald-900 dark:text-emerald-200',
        badge: 'bg-emerald-200 dark:bg-emerald-900/50',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
      },
    }

    const colors = colorClasses[zone.color]

    // Show all numbers in a grid pattern for all zones
    return (
      <div
        key={zone.name}
        className={`${colors.bg} p-5 rounded-[2rem] border ${colors.border} hover:shadow-md transition-shadow`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className={`font-bold ${colors.text} text-sm uppercase tracking-wide opacity-70`}>
            {zone.name}
          </span>
          <div className={`w-6 h-6 rounded-full ${colors.badge} flex items-center justify-center text-xs font-bold ${colors.badgeText}`}>
            {zone.count}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {numbers.map((num) => {
            const status = getNumberStatus(num)
            const boardShineEnabled = settings?.boardShine ?? true
            return (
              <div
                key={num}
                className={`aspect-square rounded-xl flex items-center justify-center font-semibold border transition-all ${
                  status === 'current'
                    ? `bg-emerald-500 ${boardShineEnabled ? 'shadow-2xl shadow-emerald-500/60 ring-2 ring-emerald-300 dark:ring-emerald-600' : 'shadow-lg shadow-emerald-500/30'} text-white text-lg transform scale-105 border-2 border-white dark:border-slate-900 ${boardShineEnabled ? 'animate-pulse' : ''}`
                    : status === 'called'
                    ? `bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50 font-bold ${boardShineEnabled ? 'shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-200 dark:ring-emerald-800' : ''}`
                    : 'bg-white dark:bg-slate-700 text-slate-300 dark:text-slate-500 border-transparent dark:border-slate-600'
                }`}
                style={boardShineEnabled && status !== 'available' ? {
                  boxShadow: status === 'current' 
                    ? '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)'
                    : '0 0 10px rgba(16, 185, 129, 0.3)'
                } : {}}
              >
                {num}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {zones.map(renderZone)}
    </div>
  )
}

export default GameBoard

