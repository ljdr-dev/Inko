import { Editor } from '@tiptap/react'
import clsx from 'clsx'

interface ToolBarProps {
    editor: Editor | null
}

function ToolBar( { editor }: ToolBarProps): React.JSX.Element {
    return <div className="flex gap-1 p-1 w-20 h-full bg-cards rounded-lg border-1 border-white/10  sm:w-20 md:w-40">
        <button 
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={clsx('p-2 rounded-lg bg-secondaryButton h-fit hover:bg-hover-secondaryButton transition-colors', editor?.isActive('bold') && 'bg-active-secondaryButton')}
        >B</button>
        <button 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={clsx('p-2 rounded-lg bg-secondaryButton h-fit hover:bg-hover-secondaryButton transition-colors', editor?.isActive('italic') && 'bg-active-secondaryButton')}
        >I</button>
    </div>
}

export default ToolBar