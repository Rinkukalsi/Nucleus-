"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { JournalEditor } from "./journal-editor"

interface QuickNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickNoteDialog({ open, onOpenChange }: QuickNoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[700px] sm:h-[90vh] bg-slate-900 border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="text-slate-200">Quick Note</DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            Create a quick note with rich text formatting and tags
          </DialogDescription>
        </DialogHeader>
        <JournalEditor 
          type="quick"
          onSave={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
