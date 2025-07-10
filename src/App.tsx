import { useRef } from 'react';
import './App.css'
// import { MyEditor } from './MyEditor'
import { GoodEditor } from './GoodEditor'

function App() {
  const editorRef = useRef(null);
  return (
    <div>
      {/* <MyEditor /> */}

      <GoodEditor ref={editorRef} value={'<p>Hello</p>'} />
    </div>
  )
}

export default App
