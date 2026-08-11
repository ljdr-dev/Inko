import type { Doc } from '../types'

interface EditingContainerProps {
    selectedDoc: Doc | null
}


function EditingContainer({selectedDoc}: EditingContainerProps): React.JSX.Element {
    return <div className="flex flex-1 h-full bg-gray-900 items-center justify-center">
         {selectedDoc === null ? (
            <p className="flex text-gray-500">Selecciona una nota para empezar</p>
         ) : (
            <p className="flex text-gray-500">{selectedDoc.title}</p>
         )}
    </div>
}

export default EditingContainer