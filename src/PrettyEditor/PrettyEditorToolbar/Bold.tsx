import { usePrettyEditorContext } from "../context";
import { bold } from "../extensions/extension-bold/bold";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Bold = () => {
  const { editor } = usePrettyEditorContext();
  const isBoldActive = useEditorStateSelector(editor, (editor) => bold.active?.(editor) ?? false);

  return (
    <button onClick={() => bold.commands?.toggleBold(editor)} style={{
      backgroundColor: isBoldActive ? 'orange' : 'yellow',
    }}>
      Bold
    </button>
  )
} 
