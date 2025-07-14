import './App.css'
import { MyEditor } from './MyEditor'
import { bold } from './PrettyEditor/extensions/extension-bold/bold'
import { PrettyEditor } from './PrettyEditor'

function App() {
  // const editorRef = useRef(null);
  return (
    <div>
      <MyEditor />

      <PrettyEditor.Root extensions={[bold]}>
        <PrettyEditor.Toolbar />
        <PrettyEditor.View />
      </PrettyEditor.Root>
    </div>
  )
}

export default App
