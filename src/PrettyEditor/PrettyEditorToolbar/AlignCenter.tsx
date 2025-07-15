import { useEditorStateSelector } from "../hooks/useEditorStateSelector";
import { align } from "../extensions/extension-align";
import { usePrettyEditorContext } from "../context";

export const AlignCenter = () => {
  const { editor } = usePrettyEditorContext();
  const isAlignCenterActive = useEditorStateSelector(editor, (editor) => align.commands.isActive(editor, 'center'));

  return (
    <button onClick={() => align.commands.toggleAlign(editor, 'center')} style={{
      backgroundColor: isAlignCenterActive ? 'orange' : 'yellow',
    }}>Align Center</button>
  )
}
