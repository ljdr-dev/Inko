import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle, FontSize, FontFamily } from "@tiptap/extension-text-style"
import { TextAlign } from '@tiptap/extension-text-align'
import { ResizableImage } from './ResizableImage'

export const tiptapExtensions = [
    StarterKit,
    TextStyle,
    FontFamily,
    FontSize,
    ResizableImage,
    TextAlign.configure({ types: ['paragraph', 'heading', "image"], defaultAlignment: 'left' })
]