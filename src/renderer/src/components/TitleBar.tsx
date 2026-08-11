import { HomeIcon } from "lucide-react"

interface TitleBarProps {
    view: 'home' | 'editor'
    onGoHome: () => void
}

function TitleBar( {view, onGoHome}: TitleBarProps): React.JSX.Element {
    return <div className="flex w-full h-10 shrink-0 bg-canvas [-webkit-app-region:drag]">
        {view === 'editor' ? (
            <div className="flex gap-5 p-3 items-center">
                <button onClick={onGoHome} className="bg-mainButton rounded-full p-2 cursor-pointer [-webkit-app-region:no-drag] hover:bg-hover-mainButton transition-colors"><HomeIcon  size={16} /></button>
            </div>
        ) : (
            <></>
        )}
    </div>
}

export default TitleBar