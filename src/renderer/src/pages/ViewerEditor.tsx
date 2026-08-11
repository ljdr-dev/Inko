import ToolBar from "@renderer/components/ToolBar"
import EditingContainer from "@renderer/components/EditingContainer"

interface ViewerEditorProps {
    selectedDoc: string | null
}

function ViewerEditor( {selectedDoc}: ViewerEditorProps ): React.JSX.Element {
    return <div className="flex h-full w-full bg-gray-900">
        <ToolBar />
        <EditingContainer selectedDoc={selectedDoc} />
    </div>
}

export default ViewerEditor