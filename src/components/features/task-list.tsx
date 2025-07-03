"use client"

import { useState, useRef } from "react"
import { useTaskStore, Task, TaskStatus } from "../../stores/use-task-store"
import { useCardStore } from "../../stores/use-card-store"
import { TaskDialog } from "./task-dialog"
import { CheckCircle2, Circle, Clock, AlertCircle, Pencil, Trash2 } from "lucide-react"
import { EditTaskDialog } from "./edit-task-dialog"
import { ScrollArea } from "../ui/scroll-area"
import { cn } from "../../lib/utils"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
const statusIcons = {
  "todo": Circle,
  "in-progress": Clock,
  "completed": CheckCircle2
}

const priorityColors = {
  low: "text-blue-400",
  medium: "text-yellow-400",
  high: "text-red-400"
}

interface TaskItemProps {
  task: Task
  index: number
  isDragDisabled?: boolean
}

function TaskItem({ task, index, isDragDisabled = false }: TaskItemProps) {
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const Icon = statusIcons[task.status]
  const [showEditDialog, setShowEditDialog] = useState(false)

  const content = (
    <div 
      className="flex items-center space-x-3 p-2 rounded-lg border bg-slate-800/50 border-slate-700 cursor-pointer hover:bg-slate-800/70"
    >
      <div className="flex-shrink-0">
        <Icon className={cn(
          "h-5 w-5",
          task.status === "completed" ? "text-green-400" : "text-slate-400"
        )} />
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className={cn(
            "text-sm font-medium truncate",
            task.status === "completed" ? "text-slate-400 line-through" : "text-slate-200"
          )}>
            {task.title}
          </h3>
          <AlertCircle className={cn(
            "h-4 w-4 flex-shrink-0",
            priorityColors[task.priority]
          )} />
        </div>
        {task.description && (
          <p className="text-xs text-slate-400 truncate">{task.description}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {task.dueDate && (
          <span className="text-xs text-slate-400 whitespace-nowrap">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowEditDialog(true)
          }}
          className="p-1 rounded-md hover:bg-slate-700/50 transition-colors"
        >
          <Pencil className="h-4 w-4 text-slate-400" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            deleteTask(task.id)
          }}
          className="p-1 rounded-md hover:bg-slate-700/50 transition-colors"
        >
          <Trash2 className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      <EditTaskDialog
        task={task}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </div>
  )

  if (isDragDisabled) {
    return content
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "transition-all",
            snapshot.isDragging && "scale-105 shadow-lg"
          )}
        >
          {content}
        </div>
      )}
    </Draggable>
  )
}

interface TaskListProps {
  variant?: 'card' | 'expanded'
}

export function TaskList({ variant = 'expanded' }: TaskListProps) {
  const tasks = useTaskStore((state) => state.tasks)
  const incompleteTasks = tasks.filter(task => task.status !== "completed")
  const [showTaskDialog, setShowTaskDialog] = useState(false)
  const { expandedCard } = useCardStore()
  const isExpanded = expandedCard === 'tasks'
  const cleanupRef = useRef<(() => void) | null>(null)

  if (variant === 'card' && !isExpanded) {
    return (
      <>
        <div className="flex flex-col h-full space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-slate-200">
                {tasks.length === 0 ? "No tasks yet" : `${incompleteTasks.length} tasks remaining`}
              </h3>
              <p className="text-sm text-slate-400">
                {tasks.length === 0 ? "Create your first task" : "Drag tasks to change status"}
              </p>
            </div>
            <button 
              onClick={() => setShowTaskDialog(true)}
              className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Add Task
            </button>
          </div>

          <ScrollArea className="h-[calc(24rem-14rem)]">
            <div className="pr-4 pb-2">
              <div className="space-y-1">
                {incompleteTasks.map((task, index) => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    index={index}
                    isDragDisabled={true}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Task Dialog */}
        <TaskDialog 
          open={showTaskDialog}
          onOpenChange={setShowTaskDialog}
        />
      </>
    )
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-slate-200">
            {tasks.length === 0 ? "No tasks yet" : `${incompleteTasks.length} tasks remaining`}
          </h3>
          <p className="text-sm text-slate-400">
            {tasks.length === 0 ? "Create your first task" : "Drag tasks between columns to update status"}
          </p>
        </div>
        <button 
          onClick={() => setShowTaskDialog(true)}
          className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-700 transition-colors"
        >
          Add Task
        </button>
      </div>

      {/* Task Columns */}
      <DragDropContext
        onDragStart={() => {
          // Prevent card from collapsing while dragging
          const handleClick = (e: MouseEvent) => {
            e.stopPropagation()
          }
          document.addEventListener('click', handleClick)
          
          // Store cleanup function
          cleanupRef.current = () => {
            document.removeEventListener('click', handleClick)
          }
        }}
        onDragEnd={(result) => {
          // Clean up click handler
          if (cleanupRef.current) {
            cleanupRef.current()
            cleanupRef.current = null
          }
          
          if (!result.destination) return
          
          const sourceStatus = result.source.droppableId as TaskStatus
          const destinationStatus = result.destination.droppableId as TaskStatus
          
          if (sourceStatus === destinationStatus) return
          
          const taskId = result.draggableId
          useTaskStore.getState().updateTask(taskId, { status: destinationStatus })
        }}
      >
        <div className="grid grid-cols-3 gap-6">
          {/* Todo Column */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium text-slate-400 px-2">Todo</h4>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "h-[calc(100vh-20rem)] rounded-lg p-2",
                    snapshot.isDraggingOver && "bg-slate-800/50"
                  )}
                >
                  <ScrollArea className="h-full">
                    <div className="pr-4 space-y-2">
                      {tasks
                        .filter(task => task.status === "todo")
                        .map((task, index) => (
                          <TaskItem 
                            key={task.id} 
                            task={task} 
                            index={index}
                          />
                        ))}
                    </div>
                  </ScrollArea>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* In Progress Column */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium text-slate-400 px-2">Doing</h4>
            <Droppable droppableId="in-progress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "h-[calc(100vh-20rem)] rounded-lg p-2",
                    snapshot.isDraggingOver && "bg-slate-800/50"
                  )}
                >
                  <ScrollArea className="h-full">
                    <div className="pr-4 space-y-2">
                      {tasks
                        .filter(task => task.status === "in-progress")
                        .map((task, index) => (
                          <TaskItem 
                            key={task.id} 
                            task={task} 
                            index={index}
                          />
                        ))}
                    </div>
                  </ScrollArea>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Done Column */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-medium text-slate-400 px-2">Done</h4>
            <Droppable droppableId="completed">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "h-[calc(100vh-20rem)] rounded-lg p-2",
                    snapshot.isDraggingOver && "bg-slate-800/50"
                  )}
                >
                  <ScrollArea className="h-full">
                    <div className="pr-4 space-y-2">
                      {tasks
                        .filter(task => task.status === "completed")
                        .map((task, index) => (
                          <TaskItem 
                            key={task.id} 
                            task={task} 
                            index={index}
                          />
                        ))}
                    </div>
                  </ScrollArea>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Task Dialog */}
      <TaskDialog 
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
      />
    </div>
  )
}
