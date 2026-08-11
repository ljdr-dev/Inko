import Home from './pages/Home'
import ViewerEditor from './pages/ViewerEditor'
import TitleBar from './components/TitleBar'
import { useState } from 'react'

const docs = ['First Doc', 'Holidays', 'Brain Storming']

function App(): React.JSX.Element {
  const [view, setView] = useState<'home' | 'editor'>('home')
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  function handleSelectDoc(doc: string): void {
    setSelectedDoc(doc)
    setView('editor')
  }
  return <div className='flex flex-col h-screen w-screen '>
    <TitleBar view={view} onGoHome={() => setView('home')} />
    {view === 'home' ? (
      <Home docs={docs} onSelectDoc={handleSelectDoc} />
    ) : (
      <ViewerEditor selectedDoc={selectedDoc} />
    )}
  </div>
}

export default App
