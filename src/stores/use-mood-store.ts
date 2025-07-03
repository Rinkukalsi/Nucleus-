import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type MoodLevel = 'great' | 'good' | 'okay' | 'bad' | 'awful'
export type MoodEmotion = 'happy' | 'excited' | 'calm' | 'tired' | 'stressed' | 'sad' | 'angry'

export interface MoodEntry {
  id: string
  level: MoodLevel
  emotions: MoodEmotion[]
  note?: string
  createdAt: string
}

interface MoodStore {
  entries: MoodEntry[]
  todaysMood?: MoodEntry
  addEntry: (entry: Omit<MoodEntry, 'id' | 'createdAt'>) => void
  updateEntry: (id: string, updates: Partial<MoodEntry>) => void
  deleteEntry: (id: string) => void
  getMoodsByDateRange: (startDate: Date, endDate: Date) => MoodEntry[]
}

export const useMoodStore = create<MoodStore>()(
  persist(
    (set, get) => ({
      entries: [],
      
      addEntry: (entry) => set((state) => {
        const newEntry = {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        return {
          entries: [...state.entries, newEntry],
          todaysMood: newEntry,
        }
      }),

      updateEntry: (id, updates) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id
            ? { ...entry, ...updates }
            : entry
        ),
      })),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),

      getMoodsByDateRange: (startDate, endDate) => {
        return get().entries.filter((entry) => {
          const entryDate = new Date(entry.createdAt)
          return entryDate >= startDate && entryDate <= endDate
        }).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      },
    }),
    {
      name: 'nucleus-mood',
    }
  )
)
