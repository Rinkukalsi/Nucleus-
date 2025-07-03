"use client"

import { useEffect, useState } from "react"
import { useTimerStore, TimerStatus } from "../../stores/use-timer-store"
import { Button } from "../ui/button"
import { Pause, Play, Square, Timer as TimerIcon, Play as PlayIcon } from "lucide-react"
import { TimerDialog } from "./timer-dialog"

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function getStatusColor(status: TimerStatus): string {
  switch (status) {
    case 'running':
      return 'text-green-400'
    case 'paused':
      return 'text-yellow-400'
    case 'completed':
      return 'text-blue-400'
    default:
      return 'text-slate-400'
  }
}

export function TimerCard() {
  const [showTimerDialog, setShowTimerDialog] = useState(false)
  const { timeLeft, status, pauseTimer, resumeTimer, resetTimer, tick } = useTimerStore()

  useEffect(() => {
    if (status !== 'running') return
    
    const interval = setInterval(() => {
      tick()
    }, 1000)
    
    return () => clearInterval(interval)
  }, [status, tick])

  return (
    <div className="h-full p-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-400">Focus Timer</p>
          <div className="flex items-center gap-2">
            <TimerIcon className={`h-5 w-5 ${getStatusColor(status)}`} />
            <h3 className="text-2xl font-semibold text-slate-200">
              {formatTime(timeLeft)}
            </h3>
          </div>
        </div>
        <div className="flex gap-1">
          {status === 'running' ? (
            <Button
              onClick={pauseTimer}
              size="sm"
              className="bg-slate-700/50 hover:bg-slate-700 h-8 w-8 p-0"
            >
              <Pause className="h-4 w-4" />
            </Button>
          ) : status === 'paused' ? (
            <Button
              onClick={resumeTimer}
              size="sm"
              className="bg-slate-700/50 hover:bg-slate-700 h-8 w-8 p-0"
            >
              <Play className="h-4 w-4" />
            </Button>
          ) : status === 'idle' ? (
            <Button
              onClick={() => setShowTimerDialog(true)}
              size="sm"
              className="bg-slate-700/50 hover:bg-slate-700 h-8 px-3 text-sm flex items-center gap-1.5"
            >
              <PlayIcon className="h-4 w-4" />
              Start
            </Button>
          ) : null}
          {(status === 'running' || status === 'paused') && (
            <Button
              onClick={resetTimer}
              size="sm"
              className="bg-slate-700/50 hover:bg-slate-700 h-8 w-8 p-0"
            >
              <Square className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {status === 'running' && (
        <div className="mt-2">
          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500/50 transition-all duration-1000"
              style={{ 
                width: `${(timeLeft / (25 * 60)) * 100}%`
              }} 
            />
          </div>
        </div>
      )}

      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
      />
    </div>
  )
}
