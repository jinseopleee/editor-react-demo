import { usePrettyEditorContext } from "../context";
import { italic } from "../extensions/extension-italic/italic";
import { useEditorStateSelector } from "../useEditorStateSelector";

export const Italic = () => {
  const { editor } = usePrettyEditorContext();
  const isItalicActive = useEditorStateSelector(editor, (editor) => italic.active?.(editor) ?? false);

  return (
    <button onClick={() => italic.commands?.toggleItalic(editor)} style={{
      backgroundColor: isItalicActive ? 'orange' : 'yellow',
    }}>
      Italic
    </button>
  )
} 
