import Home from './pages/Home'
import ViewerEditor from './pages/ViewerEditor'
import TitleBar from './components/TitleBar'
import { useState, useEffect, useRef } from 'react'
import type {Doc} from '../../types'


const SAVE_DEBOUNCE_MS = 2000
const SAVE_MAX_WAIT_MS = 30000

function App(): React.JSX.Element {
  const [docs, setDocs] = useState<Doc[]>([])
  const [view, setView] = useState<'home' | 'editor'>('home')
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null)
  const pendingDocRef = useRef<Doc | null>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const maxWaitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    window.api.listDocs().then((loadedDocs) => {
      setDocs(loadedDocs)
    })
  }, [])

  useEffect(() => {
        function handleKeyDown(e: KeyboardEvent): void {
            if (e.ctrlKey && e.key.toLowerCase() === 's') {
              e.preventDefault()
              flushSave()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

  function clearSaveTimers(): void {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = null
    if (maxWaitTimerRef.current) clearTimeout(maxWaitTimerRef.current)
    maxWaitTimerRef.current = null
  }

  function flushSave(): void {
    const doc = pendingDocRef.current
    if (!doc) return
    clearSaveTimers()
    pendingDocRef.current = null
    window.api.saveDoc(doc)
  }

  function scheduleSave(doc: Doc): void {
    if (pendingDocRef.current && pendingDocRef.current.id !== doc.id) flushSave()
    pendingDocRef.current = doc
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    debounceTimerRef.current = setTimeout(flushSave, SAVE_DEBOUNCE_MS)
    if (maxWaitTimerRef.current === null) maxWaitTimerRef.current = setTimeout(flushSave, SAVE_MAX_WAIT_MS)
  }

  function cancelPendingSave(): void {
    clearSaveTimers()
    pendingDocRef.current = null
  }

  function handleGoHome(): void {
    flushSave()
    setView('home')
  }

  function handleRenameDoc(doc: Doc): void {
    if (doc.title !== selectedDoc?.title) handleUpdateDoc(doc)
    flushSave()
  }

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
    scheduleSave(updatedDoc)
  }

  function handleDeleteDoc(doc: Doc): void {
    setDocs(docs.filter((d) => d.id !== doc.id))
    if (selectedDoc?.id === doc.id){
      setSelectedDoc(null)
      setView('home')
    }
    if (doc.id === pendingDocRef.current?.id) cancelPendingSave()
    window.api.deleteDoc(doc.id)
  }

  return <div className='flex flex-col h-screen w-screen overflow-hidden'>
    <TitleBar 
      view={view} 
      onGoHome={handleGoHome} 
      onDeleteDoc={() => selectedDoc && handleDeleteDoc(selectedDoc)} 
      selectedDoc={selectedDoc}
      onRenameDoc={handleRenameDoc}
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
