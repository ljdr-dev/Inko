import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ResizableImageComponent from './components/ResizableImageComponent'

export const ResizableImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: (attributes) => (attributes.width ? {width: attributes.width} : {})
            },
            height: {
                default: null,
                renderHTML: (attributes) => (attributes.height ? {height: attributes.height} : {})
            }
        }
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageComponent)
    }
})