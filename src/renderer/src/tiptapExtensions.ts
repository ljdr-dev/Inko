import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle } from "@tiptap/extension-text-style"
import { FontFamily } from "@tiptap/extension-font-family"
import { TextAlign } from '@tiptap/extension-text-align'

export const tiptapExtensions = [
    StarterKit,
    TextStyle,
    FontFamily,
    TextAlign.configure({ types: ['paragraph', 'heading'], defaultAlignment: 'left' })
]