import './App.css'
import { MyEditor } from './MyEditor'
import { bold } from './PrettyEditor/extensions/extension-bold/bold'
import { italic } from './PrettyEditor/extensions/extension-italic/italic'
import { PrettyEditor } from './PrettyEditor'

function App() {
  // const editorRef = useRef(null);
  return (
    <div>
      <MyEditor />

      <PrettyEditor.Root extensions={[bold, italic]}>
        <PrettyEditor.Toolbar />
        <PrettyEditor.View />
      </PrettyEditor.Root>
    </div>
  )
}

export default App
