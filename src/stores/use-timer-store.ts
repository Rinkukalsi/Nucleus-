import { create } from 'zustand'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'

interface TimerState {
  duration: number // in minutes
  timeLeft: number // in seconds
  status: TimerStatus
  startTime?: string
  endTime?: string
  
  // Actions
  startTimer: (duration: number) => void
  pauseTimer: () => void
  resumeTimer: () => void
  stopTimer: () => void
  resetTimer: () => void
  tick: () => void
}

export const useTimerStore = create<TimerState>()((set, get) => ({
  duration: 25, // default 25 minutes
  timeLeft: 25 * 60,
  status: 'idle',
  
  startTimer: (duration) => set({
    duration,
    timeLeft: duration * 60,
    status: 'running',
    startTime: new Date().toISOString(),
  }),
  
  pauseTimer: () => set({ status: 'paused' }),
  
  resumeTimer: () => set({ status: 'running' }),
  
  stopTimer: () => set({
    status: 'completed',
    timeLeft: 0,
    endTime: new Date().toISOString(),
  }),
  
  resetTimer: () => set({
    timeLeft: get().duration * 60,
    status: 'idle',
    startTime: undefined,
    endTime: undefined,
  }),
  
  tick: () => {
    const { timeLeft, status } = get()
    if (status !== 'running') return
    
    if (timeLeft <= 1) {
      set({
        timeLeft: 0,
        status: 'completed',
        endTime: new Date().toISOString(),
      })
      // Could trigger notification here
    } else {
      set({ timeLeft: timeLeft - 1 })
    }
  },
}))
