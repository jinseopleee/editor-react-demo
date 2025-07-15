import { usePrettyEditorContext } from "../context";
import { italic } from "../extensions/extension-italic/italic";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Italic = () => {
  const { editor } = usePrettyEditorContext();
  const isItalicActive = useEditorStateSelector(editor, (editor) => italic.commands.isActive(editor));

  return (
    <button onClick={() => italic.commands.toggle(editor)} style={{
      backgroundColor: isItalicActive ? 'orange' : 'yellow',
    }}>
      Italic
    </button>
  )
} 
