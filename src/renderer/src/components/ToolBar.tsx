import { Editor } from '@tiptap/react'
import clsx from 'clsx'

interface ToolBarProps {
    editor: Editor | null
}

function ToolBar( { editor }: ToolBarProps): React.JSX.Element {
    return <div className="flex gap-1 p-1 w-20 h-full bg-cards sm:w-20 md:w-40">
        <button 
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={clsx('p-2 rounded bg-secondaryButton h-10 hover:bg-hover-secondaryButton', editor?.isActive('bold') && 'bg-active-secondaryButton')}
        >B</button>
        <button 
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={clsx('p-2 rounded bg-secondaryButton h-10 hover:bg-hover-secondaryButton', editor?.isActive('italic') && 'bg-active-secondaryButton')}
        >I</button>
    </div>
}

export default ToolBar