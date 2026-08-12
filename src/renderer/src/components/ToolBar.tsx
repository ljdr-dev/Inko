import { Editor, useEditorState } from '@tiptap/react'
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Code } from 'lucide-react'
import clsx from 'clsx'
import { ChainedCommands } from "@tiptap/react"

interface ToolBarButtonConfig {
    command: (chain: ChainedCommands) => ChainedCommands
    isActive: (editor: Editor) => boolean
    icon: React.ReactNode
}

const buttons: ToolBarButtonConfig[] = [
    {command: (c) => c.toggleBold(), isActive: (e) => e.isActive('bold'), icon: <Bold size={16} />},
    {command: (c) => c.toggleItalic(), isActive: (e) => e.isActive('italic'), icon: <Italic size={16} />},
    {command: (c) => c.toggleStrike(), isActive: (e) => e.isActive('strike'), icon: <Strikethrough size={16} />},
    {command: (c) => c.toggleHeading({level: 1}), isActive: (e) => e.isActive('heading', {level: 1}), icon: <Heading1 size={16} />},
    {command: (c) => c.toggleHeading({level: 2}), isActive: (e) => e.isActive('heading', {level: 2}), icon: <Heading2 size={16} />},
    {command: (c) => c.toggleBulletList(), isActive: (e) => e.isActive('bulletList'), icon: <List size={16} />},
    {command: (c) => c.toggleOrderedList(), isActive: (e) => e.isActive('orderedList'), icon: <ListOrdered size={16} />},
    {command: (c) => c.toggleCodeBlock(), isActive: (e) => e.isActive('codeBlock'), icon: <Code size={16} />}
]

interface ToolBarProps {
    editor: Editor | null
}

function ToolBar( { editor }: ToolBarProps): React.JSX.Element {
    const activeStates = useEditorState({
        editor,
        selector: ({editor}) => (editor ? buttons.map((button) => button.isActive(editor)) : [])
    })

    return <div className="flex flex-wrap gap-1 p-1 w-20 h-full bg-canvas rounded-lg border-1 border-white/10  sm:w-20 md:w-40">
        {buttons.map((button, index) => (
            <button
                key={index}
                onClick={() => editor && button.command(editor.chain().focus()).run()}
                className={clsx(
                    'p-2 rounded-lg hover:bg-hover-secondaryButton transition-colors',
                    activeStates?.[index] ? 'bg-accent' : 'bg-secondaryButton'
                )}
            >{button.icon}
            </button>
        ))}
    </div>
}

export default ToolBar