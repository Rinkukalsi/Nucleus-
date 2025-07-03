"use client"

import MainLayout from "../components/layouts/main-layout"
import { FeatureCard } from "../components/core/feature-card"
import { CommandCenter } from "../components/features/command-center"
import { TaskList } from "../components/features/task-list"
import { JournalList } from "../components/features/journal-list"
import { useState } from "react"
import { 
  Command, 
  ClipboardList, 
  BookText, 
  SmilePlus,
  Timer,
  Activity
} from "lucide-react"
import { QuickNoteDialog } from "../components/features/quick-note-dialog"
import { MoodDialog } from "../components/features/mood-dialog"
import { TimerDialog } from "../components/features/timer-dialog"
import { TimerCard } from "../components/features/timer-card"
import { useMoodStore } from "../stores/use-mood-store"
import { ScrollArea } from "../components/ui/scroll-area"
import { Button } from "../components/ui/button"
import { ActivityCalendar } from "../components/features/activity-calendar"

export default function Home() {
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [showMoodDialog, setShowMoodDialog] = useState(false)
  const [showTimerDialog, setShowTimerDialog] = useState(false)
  const todaysMood = useMoodStore((state) => state.todaysMood)
  return (
    <MainLayout>
      {/* Top Row */}
      <FeatureCard 
        id="command"
        title="Command Center" 
        description="Quick actions and search"
        className="col-span-2"
        icon={Command}
      >
        <div className="mt-4">
          <CommandCenter />
        </div>
      </FeatureCard>

      {/* Middle Row */}
      <FeatureCard 
        id="tasks"
        title="Tasks" 
        description="Manage your tasks"
        className="col-span-1 h-96"
        icon={ClipboardList}
      >
        <TaskList variant="card" />
      </FeatureCard>

      <FeatureCard 
        id="activity"
        title="Activity" 
        description="Your daily progress"
        className="col-span-1 h-96"
        icon={Activity}
      >
        <ActivityCalendar />
      </FeatureCard>

      <FeatureCard 
        id="journal"
        title="Journal" 
        description="Your thoughts and notes"
        className="col-span-2 h-96"
        icon={BookText}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-slate-200">Journal Entries</h3>
              <p className="text-sm text-slate-400">Capture your thoughts and ideas</p>
            </div>
            <button 
              onClick={() => setShowNoteDialog(true)}
              className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-700"
            >
              New Entry
            </button>
          </div>
          <ScrollArea className="h-[calc(24rem-12rem)]">
            <div className="pr-4 pb-6">
              <JournalList />
            </div>
          </ScrollArea>
        </div>
      </FeatureCard>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6 col-span-2">
        <FeatureCard 
          id="mood"
          title="Mood" 
          description="Track your mood"
          className="h-48"
          icon={SmilePlus}
        >
        <div className="h-full p-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-slate-400">Today&apos;s Mood</p>
              <div className="flex items-center gap-2">
                {todaysMood ? (
                  <>
                    <span className="text-2xl">
                      {todaysMood.level === 'great' ? '😄' :
                       todaysMood.level === 'good' ? '🙂' :
                       todaysMood.level === 'okay' ? '😐' :
                       todaysMood.level === 'bad' ? '😕' : '😢'}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-200 capitalize">
                      {todaysMood.level}
                    </h3>
                  </>
                ) : (
                  <h3 className="text-xl font-semibold text-slate-200">Not Set</h3>
                )}
              </div>
            </div>
            <Button
              onClick={() => setShowMoodDialog(true)}
              className="bg-slate-700/50 hover:bg-slate-700 h-8 px-3 text-sm"
              size="sm"
            >
              {todaysMood ? 'Update' : 'Set Mood'}
            </Button>
          </div>
          {todaysMood && todaysMood.emotions && todaysMood.emotions.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-x-1">
              {todaysMood.emotions.map((emotion) => (
                <span
                  key={emotion}
                  className="px-1.5 leading-none py-0.5 rounded-full bg-slate-700/50 text-[10px] text-slate-300 capitalize"
                >
                  {emotion}
                </span>
              ))}
            </div>
          )}
        </div>
        </FeatureCard>

        <FeatureCard
          id="timer"
          title="Timer"
          description="Focus timer"
          className="h-48"
          icon={Timer}
        >
          <TimerCard />
        </FeatureCard>
      </div>

      <QuickNoteDialog
        open={showNoteDialog}
        onOpenChange={setShowNoteDialog}
      />
      <MoodDialog 
        open={showMoodDialog}
        onOpenChange={setShowMoodDialog}
      />
      <TimerDialog
        open={showTimerDialog}
        onOpenChange={setShowTimerDialog}
      />
    </MainLayout>
  )
}
