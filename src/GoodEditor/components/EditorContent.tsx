import { EditorView } from "prosemirror-view";
import { useEditorContext } from "../context/EditorContext";
import { useEffect } from "react";

export const EditorContent = () => {
  const { ref, viewRef, stateRef, onChange } = useEditorContext();

  useEffect(() => {
    if (!ref.current || viewRef.current) return;

    const view = new EditorView(ref.current, {
      state: stateRef.current,
      dispatchTransaction: (tr) => {
        const newState = view.state.apply(tr);
        view.updateState(newState);
        stateRef.current = newState;
        if (tr.docChanged) {
          const html = view.dom.innerHTML;
          onChange?.(html);
        }
      },
    });

    viewRef.current = view;
    return () => view.destroy();
  }, [onChange, ref, stateRef, viewRef]);

  return <div ref={ref} />;
};