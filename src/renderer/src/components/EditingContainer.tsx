import type { Doc } from '../../../types'
import { EditorContent, type Editor } from '@tiptap/react'

interface EditingContainerProps {
    selectedDoc: Doc | null
    editor: Editor | null
}


function EditingContainer({selectedDoc, editor}: EditingContainerProps): React.JSX.Element {
    return <div className="flex flex-1 h-full bg-canvas items-center justify-center">
         {selectedDoc === null ? (
            <p className="flex text-gray-500">Selecciona un documento para empezar</p>
         ) : (
            <div className="flex-1 h-full w-full p-8 overflow-y-auto text-white">
                <EditorContent editor={editor} className='h-full' />
            </div>
         )}
    </div>
}

export default EditingContainer