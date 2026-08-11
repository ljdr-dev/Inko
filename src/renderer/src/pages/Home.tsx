import type {Doc} from '../../../types'

interface HomeProps {
    docs: Doc[]
    onSelectDoc: (doc: Doc) => void
    onCreateDoc: () => void
}

function Home( { docs, onSelectDoc, onCreateDoc }: HomeProps ): React.JSX.Element {
    return <div className="flex flex-col h-full w-full bg-canvas justify-center items-center gap-3">
        <p>Selecciona o crea un documento</p>
        <button onClick={onCreateDoc} className="p-3 bg-mainButton rounded cursor-pointer hover:bg-hover-mainButton transition-color">Nuevo documento</button>
        <div className="grid grid-cols-3 gap-5">
            {docs.map((doc) => {
                return (
                    <div key={doc.id} onClick={() => onSelectDoc(doc)} className="bg-cards p-4 rounded cursor-pointer hover:bg-accent">{doc.title}</div>
                )
            })}
        </div>
    </div>
}

export default Home