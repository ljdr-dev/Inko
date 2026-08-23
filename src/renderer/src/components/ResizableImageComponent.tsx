import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useRef } from "react";

function ResizableImageComponent({node, updateAttributes, selected}: NodeViewProps): React.JSX.Element {
    const imgRef = useRef<HTMLImageElement>(null)
    function handleMouseDown(e: React.MouseEvent): void {
        e.preventDefault()
        const startX = e.clientX
        const startWidth = node.attrs.width || imgRef.current?.offsetWidth || 300

        function handleMouseMove(moveEvent: MouseEvent): void {
            const newWidth = startWidth + (moveEvent.clientX - startX)
            updateAttributes({width: Math.max(50, newWidth)})
        }

        function handleMouseUp(): void {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
    }

    return <NodeViewWrapper className='relative inline-block'>
        <img ref={imgRef} src={node.attrs.src} style={{width: node.attrs.width ? `${node.attrs.width}px` : 'auto'}} />
        {selected && (
            <div
                onMouseDown={handleMouseDown}
                className="absolute bottom-0 right-0 h-3 w-3 cursor-se-resize rounded-full bg-accent"
            />
        )}
    </NodeViewWrapper>
}

export default ResizableImageComponent