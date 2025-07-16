import { usePrettyEditorContext } from "../context";

import { history } from "../extensions/extension-history";

export const Redo = () => {
  const { editor } = usePrettyEditorContext();

  return (
    <button onClick={() => history.commands.redo(editor)}>Redo</button>
  )
}
