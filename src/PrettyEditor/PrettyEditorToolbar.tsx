import { usePrettyEditorContext } from "./context";
import { bold } from "./extensions/extension-bold/bold";
import { useSubscribe } from "./useSubscribe";

export const PrettyEditorToolbar = () => {
  const { editor } = usePrettyEditorContext();
  // const state = useSubscribe(editor, (editor) => editor.state);
  // console.log('editor :: ', editor);
  // console.log('state :: ', state);


  return <div>
    <button onClick={() => bold.commands?.toggleBold(editor.view)}>Hello</button>
  </div>
}