import { useEffect, useRef, useState } from "react"
import { clsx } from "clsx"

interface CustomSelectOption {
    label: string
    value: string
}

interface CustomSelectProps {
    value: string
    options: CustomSelectOption[]
    onChange: (value: string) => void
}

function CustomSelect({value, options, onChange}: CustomSelectProps): React.JSX.Element {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const selectedOption = options.find((option) => option.value === value)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return <div ref={containerRef} className="relative w-full">
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full rounded-lg truncate bg-secondaryButton p-2 text-left text-mainText cursor-pointer hover:bg-hover-secondaryButton transition-colors"
        >{selectedOption?.label ?? 'Select'}
        </button>
        {isOpen && (
            <div className="absolute left-20 top-full z-10 w-50 overflow-y-auto min-h-0 max-h-200 rounded-lg border border-white/10 bg-cards">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => {
                            onChange(option.value)
                            setIsOpen(false)
                        }}
                        className={clsx(
                            'block w-full truncate p-2 text-left hover:bg-hover-cards transition-colors',
                            option.value === value && 'bg-accent'
                        )}
                    >{option.label}
                    </button>
                ))}
            </div>
        )}
    </div>
}

export default CustomSelect