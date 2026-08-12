import { useState } from "react"
import ConfirmDialog from "./ConfirmDialog"
import { HomeIcon, TrashIcon } from "lucide-react"
import { Doc } from "src/types"

interface TitleBarProps {
    view: 'home' | 'editor'
    onGoHome: () => void
    onDeleteDoc: () => void
    selectedDoc: Doc | null
    onUpdateDoc: (doc: Doc) => void
}

function TitleBar( {view, onGoHome, onDeleteDoc, selectedDoc, onUpdateDoc}: TitleBarProps): React.JSX.Element {
    const [showConfirm, setShowConfirm] = useState(false)
    return <div className="flex w-full h-10 shrink-0 bg-canvas [-webkit-app-region:drag]">
        {view === 'editor' ? (
            <div className="flex flex-1 min-w-0 gap-2 p-3 items-center">
                <button onClick={onGoHome} 
                className="bg-mainButton rounded-full p-2 cursor-pointer [-webkit-app-region:no-drag] hover:bg-hover-mainButton transition-colors">
                    <HomeIcon  size={16} />
                </button>
                <button 
                onClick={() => setShowConfirm(true)} 
                className="bg-mainButton rounded-full p-2 cursor-pointer [-webkit-app-region:no-drag] hover:bg-hover-mainButton transition-colors">
                    <TrashIcon  size={16} />
                </button>
                {selectedDoc && (
                    <input 
                        value={selectedDoc?.title}
                        onChange={(e) => onUpdateDoc({ ...selectedDoc, title: e.target.value })}
                        className="[field-sizing:content] max-w-[calc(100%-300px)] min-w-20 bg-transparent outline-none truncate text-mainText font-medium [-webkit-app-region:no-drag]"
                    />
                )}
            </div>
        ) : (
            <></>
        )}
        {showConfirm && (
            <ConfirmDialog
                message="Deleting this document is permanent and cannot be undone"
                icon={<TrashIcon size={24} />}
                onConfirm={() => {
                    setShowConfirm(false)
                    onDeleteDoc()
                }}
                onCancel={() => setShowConfirm(false)}
            />
        )}
    </div>
}

export default TitleBar