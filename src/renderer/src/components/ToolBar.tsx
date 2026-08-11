import { Editor } from '@tiptap/react'
import clsx from 'clsx'

interface ToolBarProps {
    editor: Editor | null
}

function ToolBar( { editor }: ToolBarProps): React.JSX.Element {
    return <div className="flex gap-1 p-1 w-20 h-full bg-gray-950 sm:w-20 md:w-40">
        <button 
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={clsx('p-2 rounded bg-gray-800 h-10', editor?.isActive('bold') && 'bg-purple-600')}
        >B</button>
        <button 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={clsx('p-2 rounded bg-gray-800 h-10', editor?.isActive('italic') && 'bg-purple-600')}
        >I</button>
    </div>
}

export default ToolBar