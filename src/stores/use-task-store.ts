import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'todo' | 'in-progress' | 'completed'

export interface Task {
  id: string
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: string
  dueDate?: string
}

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  getTasks: (status?: TaskStatus) => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      
      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        ],
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),

      getTasks: (status) => {
        const tasks = get().tasks
        if (status) {
          return tasks.filter((task) => task.status === status)
        }
        return tasks
      },
    }),
    {
      name: 'nucleus-tasks',
    }
  )
)
