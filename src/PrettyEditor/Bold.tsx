import { usePrettyEditorContext } from "./context";
import { bold } from "./extensions/extension-bold/bold";
import { useSubscribe } from "./useSubscribe";

export const Bold = () => {
  const { editor } = usePrettyEditorContext();

  const isBoldActive = useSubscribe({
    subscribe: editor.subscribe,
    getSnapshot: () => editor,
    selector: (editor) => bold.active?.(editor) ?? false,
  });

  return (
    <button onClick={() => bold.commands?.toggleBold(editor)} style={{
      backgroundColor: isBoldActive ? 'orange' : 'yellow',
    }}>
      Bold
    </button>
  )
} 
