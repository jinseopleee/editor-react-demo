import './App.css'
import { MyEditor } from './MyEditor'
import { GoodEditor } from './GoodEditor'
import { bold } from './PrettyEditor/extensions/extension-bold/bold'
import { PrettyEditor } from './PrettyEditor'

function App() {
  // const editorRef = useRef(null);
  return (
    <div>
      <MyEditor />

      {/* <GoodEditor.Root value={'<p>Hello</p>'}>
        <GoodEditor.Toolbar />
        <GoodEditor.Content />
      </GoodEditor.Root> */}
      <PrettyEditor.Root extensions={[bold]}>
        <PrettyEditor.Toolbar />
        <PrettyEditor.View />
      </PrettyEditor.Root>
    </div>
  )
}

export default App
