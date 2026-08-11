import type {Doc} from '../../../types'

interface HomeProps {
    docs: Doc[]
    onSelectDoc: (doc: Doc) => void
    onCreateDoc: () => void
}

function Home( { docs, onSelectDoc, onCreateDoc }: HomeProps ): React.JSX.Element {
    return <div className="flex flex-col flex-1 min-h-0 w-full bg-canvas items-center gap-3">
        <p className='pt-10'>Selecciona o crea un documento</p>
        <button onClick={onCreateDoc} className="p-3 bg-mainButton rounded-lg cursor-pointer hover:bg-hover-mainButton transition-colors">Nuevo documento</button>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] flex-1 min-h-0 w-full p-10 gap-5 overflow-y-auto">
            {docs.map((doc) => {
                return (
                    <div key={doc.id} onClick={() => onSelectDoc(doc)} 
                    className="bg-cards p-4 border border-white/10 rounded-lg cursor-pointer hover:bg-hover-cards transition-colors">
                        <p className='font-medium'>{doc.title}</p>
                    </div>
                )
            })}
        </div>
    </div>
}

export default Home