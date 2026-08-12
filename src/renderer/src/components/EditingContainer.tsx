import type { Doc } from '../../../types'
import { EditorContent, type Editor } from '@tiptap/react'

interface EditingContainerProps {
    selectedDoc: Doc | null
    editor: Editor | null
}


function EditingContainer({selectedDoc, editor}: EditingContainerProps): React.JSX.Element {
    return <div className="flex flex-1 bg-canvas">
         {selectedDoc === null ? (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-mutedText">Selecciona un documento para empezar</p>
            </div>
         ) : (
            <div className="flex flex-1 w-full overflow-hidden text-mainText justify-center">
                <EditorContent editor={editor} className='h-full w-full overflow-y-auto border-1 border-white/10 bg-cards rounded-lg p-6 max-w-3xl' />
            </div>
         )}
    </div>
}

export default EditingContainer