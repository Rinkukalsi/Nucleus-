"use client"

import { useState } from "react"
import { Timer, Plus, BookText, SmilePlus, LucideIcon } from "lucide-react"
import { TaskDialog } from "./task-dialog"
import { QuickNoteDialog } from "./quick-note-dialog"
import { MoodDialog } from "./mood-dialog"
import { TimerDialog } from "./timer-dialog"

type Command = {
  id: string
  icon: LucideIcon
  label: string
  description: string
  action: () => void
}

export function CommandCenter() {
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [showMoodDialog, setShowMoodDialog] = useState(false)
  const [showTimerDialog, setShowTimerDialog] = useState(false)

  const commands: Command[] = [
    {
      id: "task",
      icon: Plus,
      label: "Add Task",
      description: "Create a new task",
      action: () => setShowTaskDialog(true)
    },
    {
      id: "note",
      icon: BookText,
      label: "Quick Note", 
      description: "Create a quick note",
      action: () => setShowNoteDialog(true)
    },
    {
      id: "mood",
      icon: SmilePlus,
      label: "Set Mood",
      description: "Track your mood",
      action: () => setShowMoodDialog(true)
    },
    {
      id: "timer",
      icon: Timer,
      label: "Start Timer",
      description: "Start a focus timer",
      action: () => setShowTimerDialog(true)
    }
  ]

  return (
    <div className="grid gap-2">
      {commands.map((cmd) => {
        const Icon = cmd.icon
        return (
          <button
            key={cmd.id}
            onClick={cmd.action}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg
                     bg-slate-800/50 border border-slate-700
                     hover:bg-slate-700/50 transition-colors
                     text-left w-full"
          >
            <Icon className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-200">{cmd.label}</p>
              <p className="text-xs text-slate-400">{cmd.description}</p>
            </div>
          </button>
        )
      })}

      {/* Dialogs */}
      <TaskDialog 
        open={showTaskDialog} 
        onOpenChange={setShowTaskDialog}
      />
      <MoodDialog
        open={showMoodDialog}
        onOpenChange={setShowMoodDialog}
      />
      <QuickNoteDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
      />
      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
      />
    </div>
  )
}
