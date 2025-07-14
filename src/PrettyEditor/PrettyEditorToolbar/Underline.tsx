import { usePrettyEditorContext } from "../context";
import { underline } from "../extensions/extension-underline/underline";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Underline = () => {
  const { editor } = usePrettyEditorContext();
  const isUnderlineActive = useEditorStateSelector(editor, (editor) => underline.active?.(editor) ?? false);

  return (
    <button onClick={() => underline.commands?.toggleUnderline(editor)} style={{
      backgroundColor: isUnderlineActive ? 'orange' : 'yellow',
    }}>
      Underline
    </button>
  )
}
