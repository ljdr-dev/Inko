import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle } from "@tiptap/extension-text-style"
import { FontFamily } from "@tiptap/extension-font-family"
import { TextAlign } from '@tiptap/extension-text-align'
import { Image } from '@tiptap/extension-image'

export const tiptapExtensions = [
    StarterKit,
    TextStyle,
    FontFamily,
    Image,
    TextAlign.configure({ types: ['paragraph', 'heading'], defaultAlignment: 'left' })
]