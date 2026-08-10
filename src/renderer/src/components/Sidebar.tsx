import { useState } from "react"
import clsx from 'clsx'


const notes = ['First Note', 'Holidays', 'Brain Storming']

function Sidebar(): React.JSX.Element {
    const [selectedNote, setSelectedNote] = useState<string | null>(null)
    
    return <div className="flex flex-col gap-1 w-40 h-full bg-blue-900">
        {notes.map((note) => {
            const isSelected = note === selectedNote
            const ButtonsClass = clsx(
                'p-2 rounded',
                isSelected ? 'bg-purple-600' : 'bg-purple-400 hover:bg-purple-300'
            )
            return (
                <div key={note} onClick={() => setSelectedNote(note)} className={ButtonsClass}>{note}</div>
            )
        })}
    </div>
}

export default Sidebar