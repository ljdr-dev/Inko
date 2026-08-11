
interface TitleBarProps {
    view: 'home' | 'editor'
    onGoHome: () => void
}

function TitleBar( {view, onGoHome}: TitleBarProps): React.JSX.Element {
    return <div className="flex w-full h-10 bg-canvas [-webkit-app-region:drag]">
        {view === 'editor' ? (
            <div className="flex gap-5 p-1">
                <button onClick={onGoHome} className="bg-mainButton rounded cursor-pointer [-webkit-app-region:no-drag] hover:bg-hover-mainButton transition-colors">Home</button>
            </div>
        ) : (
            <></>
        )}
    </div>
}

export default TitleBar