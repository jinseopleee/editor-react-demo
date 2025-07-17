import { usePrettyEditorContext } from "../context";
import { list } from "../extensions/extension-list";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const OL = () => {
  const { editor } = usePrettyEditorContext();
  const isOLActive = useEditorStateSelector(editor, (editor) => list.commands.isActive(editor, 'ordered'));

  return (
    <button onClick={() => list.commands.toggleOrderedList(editor)} style={{ backgroundColor: isOLActive ? 'orange' : 'yellow' }}>OL</button>
  )
}
