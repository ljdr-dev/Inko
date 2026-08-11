import Home from './pages/Home'
import ViewerEditor from './pages/ViewerEditor'
import TitleBar from './components/TitleBar'
import { useState, useEffect } from 'react'
import type {Doc} from '../../types'




function App(): React.JSX.Element {
  const [docs, setDocs] = useState<Doc[]>([])
  const [view, setView] = useState<'home' | 'editor'>('home')
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)
  useEffect(() => {
    window.api.listDocs().then((loadedDocs) => {
      setDocs(loadedDocs)
    })
  }, [])

  function handleSelectDoc(doc: Doc): void {
    setSelectedDoc(doc)
    setView('editor')
  }

  function handleCreateDoc(): void {
    const newDoc: Doc = {id: crypto.randomUUID(), title: "Untitled document"}
    setDocs([...docs, newDoc])
    setSelectedDoc(newDoc)
    setView('editor')
    window.api.saveDoc(newDoc)
  }

  return <div className='flex flex-col h-screen w-screen '>
    <TitleBar view={view} onGoHome={() => setView('home')} />
    {view === 'home' ? (
      <Home docs={docs} onSelectDoc={handleSelectDoc} onCreateDoc={handleCreateDoc} />
    ) : (
      <ViewerEditor selectedDoc={selectedDoc} />
    )}
  </div>
}

export default App
