
interface EditingContainerProps {
    selectedDoc: string | null
}


function EditingContainer({selectedDoc}: EditingContainerProps): React.JSX.Element {
    return <div className="flex flex-1 h-full bg-gray-900 items-center justify-center">
         {selectedDoc === null ? (
            <p className="flex text-gray-500">Selecciona una nota para empezar</p>
         ) : (
            <p className="flex text-gray-500">{selectedDoc}</p>
         )}
    </div>
}

export default EditingContainer