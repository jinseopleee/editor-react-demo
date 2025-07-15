import { usePrettyEditorContext } from "../context";
import { align } from "../extensions/extension-align";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const AlignRight = () => {
  const { editor } = usePrettyEditorContext();
  const isAlignRightActive = useEditorStateSelector(editor, (editor) => align.commands.isActive(editor, 'right'));

  return (
    <button onClick={() => align.commands.toggleAlign(editor, 'right')} style={{
      backgroundColor: isAlignRightActive ? 'orange' : 'yellow',
    }}>Align Right</button>
  )
}
