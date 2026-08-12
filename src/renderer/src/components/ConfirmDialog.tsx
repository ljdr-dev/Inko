
interface ConfirmDialogProps {
    message: string
    icon: React.ReactNode
    onConfirm: () => void
    onCancel: () => void
}

function ConfirmDialog({ message, icon, onConfirm, onCancel }: ConfirmDialogProps): React.JSX.Element {
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center gap-4 rounded-lg border border-white/10 bg-cards p-6 max-w-sm">
            {icon}
            <p className="text-center text-mainText">{message}</p>
            <div className="flex gap-3">
                <button onClick={onCancel}
                className="rounded-lg bg-secondaryButton px-4 py-2 hover:bg-hover-secondaryButton transition-colors">
                    Cancelar
                </button>
                <button onClick={onConfirm}
                className="rounded-lg bg-mainButton px-4 py-2 hover:bg-hover-mainButton transition-colors">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
}

export default ConfirmDialog