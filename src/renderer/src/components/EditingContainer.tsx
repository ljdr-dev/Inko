import type { Doc } from '../../../types'
import { EditorContent, type Editor } from '@tiptap/react'

interface EditingContainerProps {
    selectedDoc: Doc | null
    editor: Editor | null
}


function EditingContainer({selectedDoc, editor}: EditingContainerProps): React.JSX.Element {
    return <div className="flex flex-1 min-w-0 bg-canvas">
         {selectedDoc === null ? (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-mutedText">Select a document first</p>
            </div>
         ) : (
            <div className="flex flex-1 min-w-0 w-full overflow-hidden text-mainText justify-center">
                <EditorContent editor={editor} className='h-full w-full min-w-0 overflow-y-auto border-1 border-white/10 bg-cards rounded-lg p-6 max-w-3xl break-words hyphens-auto' />
            </div>
         )}
    </div>
}

export default EditingContainer