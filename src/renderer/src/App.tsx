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

  function handleUpdateDoc(updatedDoc: Doc): void {
    setSelectedDoc(updatedDoc)
    setDocs(docs.map((d) => (d.id === updatedDoc.id ? updatedDoc : d)))
    window.api.saveDoc(updatedDoc)
  }

  function handleDeleteDoc(doc: Doc): void {
    setDocs(docs.filter((d) => d.id !== doc.id))
    if (selectedDoc?.id === doc.id){
      setSelectedDoc(null)
      setView('home')
    }
    window.api.deleteDoc(doc.id)
  }

  return <div className='flex flex-col h-screen w-screen overflow-hidden'>
    <TitleBar 
      view={view} 
      onGoHome={() => setView('home')} 
      onDeleteDoc={() => selectedDoc && handleDeleteDoc(selectedDoc)} 
      selectedDoc={selectedDoc}
      onUpdateDoc={handleUpdateDoc}
    />
    {view === 'home' ? (
      <Home docs={docs} onSelectDoc={handleSelectDoc} onCreateDoc={handleCreateDoc} onDeleteDoc={handleDeleteDoc} />
    ) : (
      <ViewerEditor selectedDoc={selectedDoc} onUpdateDoc={handleUpdateDoc} />
    )}
  </div>
}

export default App
