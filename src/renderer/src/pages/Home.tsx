import { useState } from 'react'
import type {Doc} from '../../../types'
import { TrashIcon } from 'lucide-react'
import ConfirmDialog from '../components/ConfirmDialog'

interface HomeProps {
    docs: Doc[]
    onSelectDoc: (doc: Doc) => void
    onCreateDoc: () => void
    onDeleteDoc: (doc: Doc) => void
}

function Home( { docs, onSelectDoc, onCreateDoc, onDeleteDoc }: HomeProps ): React.JSX.Element {
    const [docToDelete, setDocToDelete] = useState<Doc | null>(null)

    return <div className="flex flex-col flex-1 min-h-0 w-full bg-canvas items-center gap-3">
        <p className='pt-10'>Select or create a document</p>
        <button onClick={onCreateDoc} className="p-3 bg-mainButton rounded-lg cursor-pointer hover:bg-hover-mainButton transition-colors">New document</button>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] flex-1 min-h-0 w-full p-10 gap-5 overflow-y-auto">
            {docs.map((doc) => {
                return (
                    <div key={doc.id} onClick={() => onSelectDoc(doc)} 
                    className="group bg-cards p-2 border border-white/10 rounded-lg cursor-pointer hover:bg-hover-cards transition-colors">
                        <div className='flex items-center gap-3'>
                            <p className='flex-1 font-medium truncate'>{doc.title}</p>
                            <button onClick={(e) =>  {
                                e.stopPropagation()
                                setDocToDelete(doc)
                            }}
                            className='rounded-full bg-mainButton p-2 cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-hover-mainButton transition-colors'
                            ><TrashIcon size={14} />
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        {docToDelete && (
            <ConfirmDialog
                message="Deleting this document is permanent and cannot be undone"
                icon={<TrashIcon size={24} />}
                onConfirm={() => {
                    onDeleteDoc(docToDelete)
                    setDocToDelete(null)
                }}
                onCancel={() => setDocToDelete(null)}
            />
        )}
    </div>
}

export default Home