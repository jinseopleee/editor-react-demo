import { usePrettyEditorContext } from "../context";

import { history } from "../extensions/extension-history";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Redo = () => {
  const { editor } = usePrettyEditorContext();
  const isRedoActive = useEditorStateSelector(editor, (editor) => history.commands.canRedo(editor));

  return (
    <button
      onClick={() => history.commands.redo(editor)}
      disabled={!isRedoActive}
      style={{
        backgroundColor: 'yellow'
      }}
    >
      Redo
    </button>
  )
}
