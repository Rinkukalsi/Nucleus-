"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useJournalStore, JournalEntryType } from '../../stores/use-journal-store'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Tag as TagIcon
} from 'lucide-react'

interface JournalEditorProps {
  initialContent?: string
  initialTitle?: string
  initialTags?: string[]
  type?: JournalEntryType
  onSave?: () => void
  id?: string
}

export function JournalEditor({ 
  initialContent = '', 
  initialTitle = '',
  initialTags = [],
  type = 'quick',
  onSave,
  id
}: JournalEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [tagInput, setTagInput] = useState('')
  
  const addEntry = useJournalStore((state) => state.addEntry)
  const updateEntry = useJournalStore((state) => state.updateEntry)

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-invert min-h-[calc(90vh-20rem)] max-w-none focus:outline-none',
      },
    },
    immediatelyRender: false,
  })

  const handleSave = () => {
    if (!editor) return

    const content = editor.getHTML()
    
    if (id) {
      updateEntry(id, {
        title,
        content,
        tags,
        type,
      })
    } else {
      addEntry({
        title,
        content,
        tags,
        type,
      })
    }

    onSave?.()
  }

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  if (!editor) return null

  return (
    <div className="space-y-4">
      {/* Title Input */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="text-lg font-medium bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
      />

      {/* Toolbar */}
      <div className="flex items-center space-x-2 bg-slate-800/50 p-2 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-700' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-700' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-slate-700' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-slate-700' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-slate-700' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="ml-auto flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-[calc(90vh-20rem)] bg-slate-800/50 p-4 rounded-lg overflow-y-auto">
        <EditorContent editor={editor} />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <TagIcon className="h-4 w-4 text-slate-400" />
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTag()
              }
            }}
            placeholder="Add tags..."
            className="bg-slate-800/50 border-slate-700 text-slate-200 placeholder:text-slate-400"
          />
          <Button 
            variant="outline"
            size="sm"
            onClick={handleAddTag}
          >
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-slate-700 text-sm text-slate-200 flex items-center space-x-1"
              >
                <span>{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-slate-400 hover:text-slate-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200"
        >
          {id ? 'Update Entry' : 'Save Entry'}
        </Button>
      </div>
    </div>
  )
}
