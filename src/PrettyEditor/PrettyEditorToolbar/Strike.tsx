import { usePrettyEditorContext } from "../context";
import { strike } from "../extensions/extension-strike/strike";
import { useEditorStateSelector } from "../hooks/useEditorStateSelector";

export const Strike = () => {
  const { editor } = usePrettyEditorContext();
  const isStrikeActive = useEditorStateSelector(editor, (editor) => strike.commands.isActive(editor));

  return (
    <button onClick={() => strike.commands.toggle(editor)} style={{
      backgroundColor: isStrikeActive ? 'orange' : 'yellow',
    }}>
      Strike
    </button>
  )
}
