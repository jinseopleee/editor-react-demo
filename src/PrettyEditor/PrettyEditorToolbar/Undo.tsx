import { usePrettyEditorContext } from "../context";

import { history } from "../extensions/extension-history";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Undo = () => {
  const { editor } = usePrettyEditorContext();
  const isUndoActive = useEditorStateSelector(editor, (editor) => history.commands.canUndo(editor));

  return (
    <button 
      onClick={() => history.commands.undo(editor)} 
      disabled={!isUndoActive} 
      style={{
        backgroundColor: 'yellow'
      }}
    >
      Undo
    </button>
  )
}
