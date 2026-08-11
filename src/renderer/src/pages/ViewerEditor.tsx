import ToolBar from "@renderer/components/ToolBar"
import EditingContainer from "@renderer/components/EditingContainer"
import type {Doc} from '../../../types'
import { useEditor } from "@tiptap/react"
import { StarterKit } from '@tiptap/starter-kit'

interface ViewerEditorProps {
    selectedDoc: Doc | null
}

function ViewerEditor( {selectedDoc}: ViewerEditorProps ): React.JSX.Element {
    const editor = useEditor({ 
        extensions:[StarterKit], 
        editorProps: {
            attributes: {
                class: 'h-full outline-none'
            }
        }
    })
    return <div className="flex h-full w-full bg-gray-900">
        <ToolBar />
        <EditingContainer selectedDoc={selectedDoc} editor={editor} />
    </div>
}

export default ViewerEditor