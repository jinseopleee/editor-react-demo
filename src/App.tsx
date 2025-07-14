import './App.css'
import { PrettyEditor } from './PrettyEditor'

function App() {
  return (
    <div>
      <PrettyEditor.Root>
        <PrettyEditor.Toolbar />
        <PrettyEditor.View />
      </PrettyEditor.Root>
    </div>
  )
}

export default App
