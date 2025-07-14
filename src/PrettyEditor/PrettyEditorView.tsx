import { useEffect, useRef } from "react"
import { usePrettyEditorContext } from "./context";

export const PrettyEditorView = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { editor } = usePrettyEditorContext();

  useEffect(() => {
    if (!editorRef.current) return;
    editor.mount(editorRef.current);

    return () => {
      editor.unmount();
    }
  }, [editor])

  return <div ref={editorRef} className="editor-content" />
}
