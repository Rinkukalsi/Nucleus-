import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type JournalEntryType = 'daily' | 'project' | 'meeting' | 'idea' | 'goal' | 'gratitude' | 'quick'

export interface JournalEntry {
  id: string
  type: JournalEntryType
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface JournalStore {
  entries: JournalEntry[]
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void
  deleteEntry: (id: string) => void
  getEntries: (type?: JournalEntryType) => JournalEntry[]
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],
      
      addEntry: (entry) => set((state) => ({
        entries: [
          ...state.entries,
          {
            ...entry,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      })),

      updateEntry: (id, updates) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id
            ? { 
                ...entry, 
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : entry
        ),
      })),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),

      getEntries: (type) => {
        const entries = get().entries
        if (type) {
          return entries.filter((entry) => entry.type === type)
        }
        return entries.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      },
    }),
    {
      name: 'nucleus-journal',
    }
  )
)
