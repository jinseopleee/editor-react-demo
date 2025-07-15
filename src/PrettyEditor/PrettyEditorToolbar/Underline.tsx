import { usePrettyEditorContext } from "../context";
import { underline } from "../extensions/extension-underline/underline";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Underline = () => {
  const { editor } = usePrettyEditorContext();
  const isUnderlineActive = useEditorStateSelector(editor, (editor) => underline.commands.isActive(editor));

  return (
    <button onClick={() => underline.commands.toggle(editor)} style={{
      backgroundColor: isUnderlineActive ? 'orange' : 'yellow',
    }}>
      Underline
    </button>
  )
}
