import ToolBar from "@renderer/components/ToolBar"
import EditingContainer from "@renderer/components/EditingContainer"
import type {Doc} from '../../../types'
import { useEditor } from "@tiptap/react"
import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle } from "@tiptap/extension-text-style"
import { FontFamily } from "@tiptap/extension-font-family"
import { TextAlign } from '@tiptap/extension-text-align'

interface ViewerEditorProps {
    selectedDoc: Doc | null
    onUpdateDoc: (doc: Doc) => void
}

function ViewerEditor( {selectedDoc, onUpdateDoc}: ViewerEditorProps ): React.JSX.Element {
    const editor = useEditor({ 
        extensions:[StarterKit, TextStyle, FontFamily, TextAlign.configure({types: ['paragraph', 'heading'], defaultAlignment: 'left'})], 
        content: selectedDoc?.content,
        onUpdate: ({ editor }) => {
            if (selectedDoc) {
                onUpdateDoc({...selectedDoc, content: editor.getJSON()})
            }
        },
        editorProps: {
            attributes: {
                class: 'h-full outline-none prose prose-invert max-w-none'
            }
        }
    })
    return <div className="flex flex-1 min-h-0 w-full bg-canvas gap-3 p-3">
        <ToolBar editor={editor} />
        <EditingContainer selectedDoc={selectedDoc} editor={editor} />
    </div>
}

export default ViewerEditor