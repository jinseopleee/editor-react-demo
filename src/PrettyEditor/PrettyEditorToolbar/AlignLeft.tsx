import { usePrettyEditorContext } from "../context";
import { align } from "../extensions/extension-align";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const AlignLeft = () => {
  const { editor } = usePrettyEditorContext();
  const isAlignLeftActive = useEditorStateSelector(editor, (editor) => align.commands.isActive(editor, 'left'));

  return (
    <button onClick={() => align.commands.toggleAlign(editor, 'left')} style={{
      backgroundColor: isAlignLeftActive ? 'orange' : 'yellow',
    }}>Align Left</button>
  )
}
