"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { useMoodStore, MoodLevel, MoodEmotion } from "../../stores/use-mood-store"
import { cn } from "../../lib/utils"

const moodLevels: { level: MoodLevel; emoji: string; color: string }[] = [
  { level: 'great', emoji: '😄', color: 'bg-green-500' },
  { level: 'good', emoji: '🙂', color: 'bg-blue-500' },
  { level: 'okay', emoji: '😐', color: 'bg-yellow-500' },
  { level: 'bad', emoji: '😕', color: 'bg-orange-500' },
  { level: 'awful', emoji: '😢', color: 'bg-red-500' },
]

const emotions: { type: MoodEmotion; emoji: string }[] = [
  { type: 'happy', emoji: '😊' },
  { type: 'excited', emoji: '🎉' },
  { type: 'calm', emoji: '😌' },
  { type: 'tired', emoji: '😴' },
  { type: 'stressed', emoji: '😰' },
  { type: 'sad', emoji: '😔' },
  { type: 'angry', emoji: '😠' },
]

interface MoodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MoodDialog({ open, onOpenChange }: MoodDialogProps) {
  const [selectedLevel, setSelectedLevel] = useState<MoodLevel | null>(null)
  const [selectedEmotions, setSelectedEmotions] = useState<MoodEmotion[]>([])
  const [note, setNote] = useState('')
  
  const addEntry = useMoodStore((state) => state.addEntry)

  const handleEmotionToggle = (emotion: MoodEmotion) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  const handleSave = () => {
    if (!selectedLevel) return

    addEntry({
      level: selectedLevel,
      emotions: selectedEmotions,
      note: note || undefined,
    })

    // Reset form
    setSelectedLevel(null)
    setSelectedEmotions([])
    setNote('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-slate-200">How are you feeling?</DialogTitle>
        </DialogHeader>
        
        {/* Mood Levels */}
        <div className="grid grid-cols-5 gap-2">
          {moodLevels.map(({ level, emoji, color }) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={cn(
                "p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition-all",
                selectedLevel === level 
                  ? color
                  : "bg-slate-800 hover:bg-slate-700"
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-xs text-slate-200 capitalize">{level}</span>
            </button>
          ))}
        </div>

        {/* Emotions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-200">Select emotions:</h4>
          <div className="flex flex-wrap gap-2">
            {emotions.map(({ type, emoji }) => (
              <button
                key={type}
                onClick={() => handleEmotionToggle(type)}
                className={cn(
                  "px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors",
                  selectedEmotions.includes(type)
                    ? "bg-slate-700 text-slate-200"
                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-800"
                )}
              >
                <span>{emoji}</span>
                <span className="text-sm capitalize">{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-200">Add a note (optional):</h4>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you feeling today?"
            className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={!selectedLevel}
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              selectedLevel
                ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                : "bg-slate-800/50 text-slate-400 cursor-not-allowed"
            )}
          >
            Save Mood
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
