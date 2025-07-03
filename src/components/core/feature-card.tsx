"use client"

import { m as motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useCardStore } from "@/stores/use-card-store"

export type CardId = 'command' | 'activity' | 'tasks' | 'journal' | 'mood' | 'timer'

interface FeatureCardProps {
  id: CardId
  title: string
  description: string
  className?: string
  children?: React.ReactNode
  icon: React.ElementType
}

export function FeatureCard({ 
  id,
  title, 
  description, 
  className,
  children,
  icon: Icon
}: FeatureCardProps) {
  const { expandedCard, setExpandedCard } = useCardStore()
  const isExpanded = expandedCard === id

  return (
    <>
      <motion.div
        layout
        onClick={() => setExpandedCard(isExpanded ? null : id)}
        className={cn(
          "rounded-xl bg-slate-900/50 p-6 backdrop-blur-sm",
          "border border-slate-800/50 shadow-lg",
          "cursor-pointer transition-all duration-300",
          "hover:bg-slate-900/60 hover:border-slate-700/50",
          "group relative", // Added relative
          isExpanded ? "fixed inset-4 h-auto z-50 overflow-auto" : className
        )}
        initial={false}
        animate={{
          opacity: 1,
          scale: isExpanded ? 1 : 1,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-md bg-slate-800/50 group-hover:bg-slate-800">
              <Icon className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-200">{title}</h2>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          </div>
          
          {isExpanded && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setExpandedCard(null)
              }}
              className="p-2 rounded-md hover:bg-slate-800/50"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>

        {/* Content - Always render children */}
        <div 
          className="mt-6"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </motion.div>

      {/* Backdrop */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedCard(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}
    </>
  )
}
