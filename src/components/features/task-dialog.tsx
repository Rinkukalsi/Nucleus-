"use client"

import { useForm } from "react-hook-form"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useTaskStore, TaskPriority } from "../../stores/use-task-store"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { cn } from "../../lib/utils"

interface TaskForm {
  title: string
  description: string
  priority: TaskPriority
  dueDate: Date
}

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const addTask = useTaskStore((state) => state.addTask)
  const form = useForm<TaskForm>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: new Date(),
    },
  })

  const onSubmit = (data: TaskForm) => {
    addTask({
      ...data,
      status: "todo",
      dueDate: format(data.dueDate, "yyyy-MM-dd"),
    })
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
          <DialogTitle className="text-slate-200">Create New Task</DialogTitle>
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
                  <FormLabel className="text-slate-200">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Task title..." 
                      className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Task description..." 
                      className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Priority</FormLabel>
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
                  <FormLabel className="text-slate-200">Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-slate-800/50 border-slate-700 text-slate-200",
                            !field.value && "text-slate-400"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-900 border-slate-800" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                        className="bg-slate-900 text-slate-200"
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-700/50 hover:text-slate-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-slate-700 hover:bg-slate-600 text-slate-200"
              >
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
