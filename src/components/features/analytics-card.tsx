"use client"

import { BarChart2, Clock, CheckSquare } from "lucide-react"
import { ActivityCalendar } from "./activity-calendar"

export function AnalyticsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-800/50 p-4">
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-emerald-500" />
            <p className="text-sm text-slate-400">Tasks</p>
          </div>
          <h3 className="text-2xl font-semibold text-slate-200 mt-2">12</h3>
          <p className="text-xs text-slate-400 mt-1">+3 from last week</p>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-slate-400">Focus Time</p>
          </div>
          <h3 className="text-2xl font-semibold text-slate-200 mt-2">2.5h</h3>
          <p className="text-xs text-slate-400 mt-1">+0.5h from yesterday</p>
        </div>
        <div className="rounded-lg bg-slate-800/50 p-4">
          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-slate-400">Productivity</p>
          </div>
          <h3 className="text-2xl font-semibold text-slate-200 mt-2">85%</h3>
          <p className="text-xs text-slate-400 mt-1">+5% from average</p>
        </div>
      </div>

      <div className="rounded-lg bg-slate-800/50 p-4">
        <ActivityCalendar 
          data={{
            "2024-01-08": 5,
            "2024-01-07": 3,
            "2024-01-06": 7,
            "2024-01-05": 2,
            "2024-01-04": 4,
            "2024-01-03": 6,
            "2024-01-02": 8,
            "2024-01-01": 3,
            "2023-12-31": 5,
            "2023-12-30": 4,
            // Add more dates as needed
          }} 
        />
      </div>
    </div>
  )
}