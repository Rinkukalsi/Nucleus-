"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"
import { useTimerStore } from "../../stores/use-timer-store"
import { Timer } from "lucide-react"

const presetDurations = [
  { label: '25min', value: 25 },
  { label: '45min', value: 45 },
  { label: '60min', value: 60 },
]

interface TimerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TimerDialog({ open, onOpenChange }: TimerDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState(25)
  const startTimer = useTimerStore((state) => state.startTimer)

  const handleStart = () => {
    startTimer(selectedDuration)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Start Focus Timer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-center items-center">
            <Timer className="h-12 w-12 text-slate-400" />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {presetDurations.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSelectedDuration(value)}
                className={`p-4 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${
                  selectedDuration === value
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl font-semibold">{value}</span>
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleStart}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              Start Timer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
