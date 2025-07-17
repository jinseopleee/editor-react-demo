import { usePrettyEditorContext } from "../context";
import { list } from "../extensions/extension-list";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const UL = () => {
  const { editor } = usePrettyEditorContext();
  const isULActive = useEditorStateSelector(editor, (editor) => list.commands.isActive(editor, 'bullet'));

  return (
    <button onClick={() => list.commands.toggleBulletList(editor)} style={{ backgroundColor: isULActive ? 'orange' : 'yellow' }}>UL</button>
  )
}
