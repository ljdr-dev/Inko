
interface HomeProps {
    docs: string[]
    onSelectDoc: (doc: string) => void
}

function Home( { docs, onSelectDoc }: HomeProps ): React.JSX.Element {
    return <div className="flex flex-col h-full w-full bg-gray-900 justify-center items-center gap-3">
        <p>Selecciona o crea un documento</p>
        <button className="p-3 bg-purple-900 rounded cursor-pointer hover:bg-purple-800 transition-color">Nuevo documento</button>
        <div className="grid grid-cols-3 gap-5">
            {docs.map((doc) => {
                return (
                    <div key={doc} onClick={() => onSelectDoc(doc)} className="bg-gray-950 p-4 rounded cursor-pointer hover:bg-gray-800">{doc}</div>
                )
            })}
        </div>
    </div>
}

export default Home