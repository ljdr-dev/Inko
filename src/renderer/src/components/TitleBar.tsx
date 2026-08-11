
interface TitleBarProps {
    view: 'home' | 'editor'
    onGoHome: () => void
}

function TitleBar( {view, onGoHome}: TitleBarProps): React.JSX.Element {
    return <div className="flex w-full h-10 bg-gray-900 [-webkit-app-region:drag]">
        {view === 'editor' ? (
            <div className="flex gap-5 p-1">
                <button onClick={onGoHome} className="bg-gray-950 cursor-pointer [-webkit-app-region:no-drag]">Home</button>
            </div>
        ) : (
            <></>
        )}
    </div>
}

export default TitleBar