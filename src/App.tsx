import './App.css'
import { bold } from './PrettyEditor/extensions/extension-bold/bold'
import { italic } from './PrettyEditor/extensions/extension-italic/italic'
import { PrettyEditor } from './PrettyEditor'

function App() {
  return (
    <div>
      <PrettyEditor.Root extensions={[bold, italic]}>
        <PrettyEditor.Toolbar />
        <PrettyEditor.View />
      </PrettyEditor.Root>
    </div>
  )
}

export default App
