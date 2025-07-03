"use client"

import { useEffect, useState } from "react"

type Activity = {
  date: string
  count: number
}

// Mock data generator - Replace with real data later
function generateMockData(): Activity[] {
  const data: Activity[] = []
  const today = new Date()
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5)
    })
  }
  
  return data.reverse()
}

function getActivityColor(count: number): string {
  if (count === 0) return 'bg-slate-800/50'
  if (count === 1) return 'bg-green-900/50'
  if (count === 2) return 'bg-green-700/50'
  if (count === 3) return 'bg-green-500/50'
  return 'bg-green-400/50'
}

export function ActivityCalendar() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    setActivities(generateMockData())
  }, [])

  // Group activities by week
  const weeks: Activity[][] = []
  let currentWeek: Activity[] = []

  activities.forEach((activity) => {
    currentWeek.push(activity)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <div className="h-full p-3">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-slate-200">Activity</h3>
          <p className="text-sm text-slate-400">Your daily progress</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)} hover:ring-2 hover:ring-slate-400 transition-all`}
                  title={`${day.date}: ${day.count} activities`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3">
        <div className="text-xs text-slate-400">Less</div>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-2 h-2 rounded-sm ${getActivityColor(level)}`}
          />
        ))}
        <div className="text-xs text-slate-400">More</div>
      </div>
    </div>
  )
}
