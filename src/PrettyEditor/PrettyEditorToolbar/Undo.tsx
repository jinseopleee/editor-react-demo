import { usePrettyEditorContext } from "../context";

import { history } from "../extensions/extension-history";

export const Undo = () => {
  const { editor } = usePrettyEditorContext();

  return (
    <button onClick={() => history.commands.undo(editor)}>Undo</button>
  )
}
