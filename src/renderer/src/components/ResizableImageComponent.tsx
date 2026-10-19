import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Plus } from 'lucide-react'
import { useRef } from "react";

const FLOAT_MAX_RATIO = 0.7

function ResizableImageComponent({node, updateAttributes, selected}: NodeViewProps): React.JSX.Element {
    const imgRef = useRef<HTMLImageElement>(null)
    const textAlign = node.attrs.textAlign
    function handleMouseDown(e: React.MouseEvent): void {
        e.preventDefault()
        const startX = e.clientX
        const startWidth = imgRef.current?.offsetWidth || node.attrs.width || 300
        const multiplier = textAlign === 'left' ? 1 : textAlign === 'right' ? -1 : 2
        const editorWidth = imgRef.current?.closest('.ProseMirror')?.clientWidth ?? 800
        const maxWidth = textAlign === 'left' || textAlign === 'right' ? editorWidth * FLOAT_MAX_RATIO : editorWidth

        function handleMouseMove(moveEvent: MouseEvent): void {
            const newWidth = startWidth + (moveEvent.clientX - startX) * multiplier
            updateAttributes({width: Math.min(maxWidth, Math.max(50, newWidth))})
        }

        function handleMouseUp(): void {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    const wrapperStyle: React.CSSProperties = 
        textAlign === 'left'
            ? { float: 'left', marginRight: '1rem', marginBottom: '0.5rem', maxWidth: `${FLOAT_MAX_RATIO * 100}%` }
            : textAlign === 'right'
            ? { float: 'right', marginLeft: '1rem', marginBottom: '0.5rem', maxWidth: `${FLOAT_MAX_RATIO * 100}%` }
            : { display: 'block', width: 'fit-content', margin: '0 auto 1rem', maxWidth: '100%' }

    return <NodeViewWrapper className='relative inline-block' style={wrapperStyle}>
        <img ref={imgRef} src={node.attrs.src} style={{width: node.attrs.width ? `${node.attrs.width}px` : 'auto'}} />
        {selected && (
            <div
                onMouseDown={handleMouseDown}
                className={`absolute bottom-0 h-5 w-5 translate-y-1/2 ${ textAlign === 'right' ? 'left-0 cursor-sw-resize -translate-x-1/2' : 'right-0 cursor-se-resize translate-x-1/2' }`}
            >
                <Plus size={20}/>
            </div>
        )}
    </NodeViewWrapper>
}

export default ResizableImageComponent