"use client"

import { useState } from "react"
import { useJournalStore, JournalEntry } from "../../stores/use-journal-store"
import { format } from "date-fns"
import { BookText, Tag as TagIcon } from "lucide-react"
import { cn } from "../../lib/utils"
import { QuickNoteDialog } from "./quick-note-dialog"
import { JournalEditor } from "./journal-editor"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface JournalEntryCardProps {
  entry: JournalEntry
  variant?: 'card' | 'expanded'
  onSelect: (entry: JournalEntry) => void
}

function JournalEntryCard({ entry, variant = 'card', onSelect }: JournalEntryCardProps) {
  return (
    <div 
      onClick={() => onSelect(entry)}
      className={cn(
        "p-6 rounded-xl border bg-slate-800/50 border-slate-700 cursor-pointer hover:bg-slate-800/70 transition-colors shadow-lg",
        variant === 'expanded' ? "h-[320px] flex flex-col" : "h-auto"
      )}
    >
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-slate-200 line-clamp-1">{entry.title}</h3>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <BookText className="h-4 w-4" />
            <span className="capitalize">{entry.type}</span>
            <span>•</span>
            <span>{format(new Date(entry.createdAt), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        {/* Preview */}
        <div 
          className="mt-4 text-sm text-slate-400 line-clamp-6 flex-1"
          dangerouslySetInnerHTML={{ 
            __html: entry.content.replace(/<[^>]*>/g, ' ').slice(0, 300) + '...'
          }}
        />

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <TagIcon className="h-3 w-3 text-slate-400" />
            <div className="flex flex-wrap gap-1">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded-full bg-slate-700 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface JournalListProps {
  variant?: 'card' | 'expanded'
}

export function JournalList({ variant = 'card' }: JournalListProps) {
  const entries = useJournalStore((state) => state.getEntries())
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

  if (variant === 'card') {
    if (entries.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-2 text-center">
          <BookText className="h-8 w-8 text-slate-400" />
          <div className="space-y-1">
            <h3 className="font-medium text-slate-200">No journal entries yet</h3>
            <p className="text-sm text-slate-400">Create your first entry to get started</p>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              variant={variant}
              onSelect={setSelectedEntry}
            />
          ))}
        </div>

        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="sm:max-w-[700px] sm:h-[90vh] bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-slate-200">View Entry</DialogTitle>
            </DialogHeader>
            {selectedEntry && (
              <JournalEditor
                id={selectedEntry.id}
                type={selectedEntry.type}
                initialTitle={selectedEntry.title}
                initialContent={selectedEntry.content}
                initialTags={selectedEntry.tags}
                onSave={() => setSelectedEntry(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Expanded view
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 overflow-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col space-y-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-medium text-slate-200">Quick Notes</h2>
              <p className="text-sm text-slate-400">Capture your thoughts and ideas</p>
            </div>
            <button 
              onClick={() => setShowNoteDialog(true)}
              className="px-4 py-2 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-700"
            >
              New Entry
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 gap-10">
            {entries
              .filter(entry => entry.type === 'quick')
              .map((entry) => (
                <JournalEntryCard
                  key={entry.id}
                  entry={entry}
                  variant={variant}
                  onSelect={setSelectedEntry}
                />
              ))}
          </div>
        </div>

        <QuickNoteDialog
          open={showNoteDialog}
          onOpenChange={setShowNoteDialog}
        />

        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="sm:max-w-[700px] sm:h-[90vh] bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-slate-200">View Entry</DialogTitle>
            </DialogHeader>
            {selectedEntry && (
              <JournalEditor
                id={selectedEntry.id}
                type={selectedEntry.type}
                initialTitle={selectedEntry.title}
                initialContent={selectedEntry.content}
                initialTags={selectedEntry.tags}
                onSave={() => setSelectedEntry(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
