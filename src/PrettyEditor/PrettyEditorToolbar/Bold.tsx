import { usePrettyEditorContext } from "../context";
import { bold } from "../extensions/extension-bold/bold";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Bold = () => {
  const { editor } = usePrettyEditorContext();
  const isBoldActive = useEditorStateSelector(editor, (editor) => bold.commands.isActive(editor));

  return (
    <button onClick={() => bold.commands.toggle(editor)} style={{
      backgroundColor: isBoldActive ? 'orange' : 'yellow',
    }}>
      Bold
    </button>
  )
} 
