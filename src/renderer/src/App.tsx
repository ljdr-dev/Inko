import Sidebar from './components/Sidebar'
import EditingContainer from './components/EditingContainer'

function App(): React.JSX.Element {
  return <div className='flex h-screen w-screen bg-green-900'>
    <Sidebar />
    <EditingContainer />
  </div>
}

export default App
