"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useTaskStore, TaskPriority, Task } from "../../stores/use-task-store"

interface TaskForm {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
}

interface EditTaskDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({ task, open, onOpenChange }: EditTaskDialogProps) {
  const updateTask = useTaskStore((state) => state.updateTask)
  const form = useForm<TaskForm>({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate || format(new Date(), "yyyy-MM-dd"),
    },
  })

  // Update form when task changes
  useEffect(() => {
    form.reset({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate || format(new Date(), "yyyy-MM-dd"),
    })
  }, [task, form])

  const onSubmit = (data: TaskForm) => {
    updateTask(task.id, data)
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] bg-slate-900 border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Task description..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-slate-200"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="date" {...field} />
                      <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
