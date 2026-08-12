import { Editor, useEditorState } from '@tiptap/react'
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Code, AlignLeft, AlignCenter, AlignRight, AlignJustify, ImageIcon } from 'lucide-react'
import clsx from 'clsx'
import { ChainedCommands } from "@tiptap/react"
import CustomSelect from './CustomSelect'
import { useRef } from 'react'

interface ToolBarButtonConfig {
    command: (chain: ChainedCommands) => ChainedCommands
    isActive: (editor: Editor) => boolean
    icon: React.ReactNode
}

const fontOptions = [
    {label: 'Default (Inter)', value: ''},
    {label: 'Serif', value: 'Georgia, serif'},
    {label: 'MonoSpace', value: '"Courier New", monospace'},
    {label: 'Sans-serif', value: 'Arial, sans-serif'}
]

const buttonGroups: ToolBarButtonConfig[][] = [
    [ // Bold, Italic, Strike
        { command: (c) => c.toggleBold(), isActive: (e) => e.isActive('bold'), icon: <Bold size={16} /> },
        { command: (c) => c.toggleItalic(), isActive: (e) => e.isActive('italic'), icon: <Italic size={16} /> },
        { command: (c) => c.toggleStrike(), isActive: (e) => e.isActive('strike'), icon: <Strikethrough size={16} /> }
    ],
    [ // Alineación
        { command: (c) => c.setTextAlign('left'), isActive: (e) => e.isActive({ textAlign: 'left' }), icon: <AlignLeft size={16} /> },
        { command: (c) => c.setTextAlign('center'), isActive: (e) => e.isActive({ textAlign: 'center' }), icon: <AlignCenter size={16} /> },
        { command: (c) => c.setTextAlign('right'), isActive: (e) => e.isActive({ textAlign: 'right' }), icon: <AlignRight size={16} /> },
        { command: (c) => c.setTextAlign('justify'), isActive: (e) => e.isActive({ textAlign: 'justify' }), icon: <AlignJustify size={16} /> }
    ],
    [ // Headers
        { command: (c) => c.toggleHeading({level: 1}), isActive: (e) => e.isActive('heading', {level: 1}), icon: <Heading1 size={16} /> },
        { command: (c) => c.toggleHeading({level: 2}), isActive: (e) => e.isActive('heading', {level: 2}), icon: <Heading2 size={16} /> }
    ],
    [ // Lists
        { command: (c) => c.toggleBulletList(), isActive: (e) => e.isActive('bulletList'), icon: <List size={16} /> },
        { command: (c) => c.toggleOrderedList(), isActive: (e) => e.isActive('orderedList'), icon: <ListOrdered size={16} /> }
    ],
    [ // Code
        { command: (c) => c.toggleCodeBlock(), isActive: (e) => e.isActive('codeBlock'), icon: <Code size={16} /> }
    ]
]


interface ToolBarProps {
    editor: Editor | null
}

function ToolBar( { editor }: ToolBarProps): React.JSX.Element {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const activeStates = useEditorState({
        editor,
        selector: ({editor}) => (editor ? buttonGroups.map((group) => group.map((button) => button.isActive(editor))) : [])
    })

    const currentFontFamily = useEditorState({
        editor,
        selector: ({ editor }) => editor?.getAttributes('textStyle').fontFamily ?? null
    })

    function handleImageClick(): void {
        fileInputRef.current?.click()
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = () => {
            editor?.chain().focus().setImage({src: reader.result as string}).run()
        }
        reader.readAsDataURL(file)
    }

    return <div className="flex flex-col gap-5 p-1 w-30 h-full bg-canvas rounded-lg border-1 border-white/10  sm:w-30 md:w-50">
        <div className='flex flex-wrap gap-1 p-1'>
            <CustomSelect
                value={currentFontFamily ?? ''}
                options={fontOptions}
                onChange={(value) => {
                    if (value === '') {
                        editor?.chain().focus().unsetFontFamily().run()
                    } else {
                        editor?.chain().focus().setFontFamily(value).run()
                    }
                }} 
            />
            <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
            />
            <button
                onClick={handleImageClick}
                className='w-full rounded-lg truncate bg-secondaryButton p-2 text-left text-mainText cursor-pointer hover:bg-hover-secondaryButton transition-colors'
            ><ImageIcon size={16}/>
            </button>
        </div>
        {buttonGroups.map((group, groupIndex) => (
            <div key={groupIndex} className='flex flex-wrap gap-1 p-1'>
                {group.map((button, buttonIndex) => (
                    <button 
                        key={buttonIndex}
                        onClick={() => editor && button.command(editor.chain().focus()).run()}
                        className={clsx(
                            'flex-1 p-2 rounded-lg cursor-pointer hover:bg-hover-secondaryButton transition-colors',
                            activeStates?.[groupIndex]?.[buttonIndex] ? 'bg-accent' : 'bg-secondaryButton'
                        )}
                    >{button.icon}
                    </button>
                ))}
            </div>
        ))}
    </div>
}

export default ToolBar