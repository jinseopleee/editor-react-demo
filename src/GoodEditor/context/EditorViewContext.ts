import { createContext, useContext } from "react";
import type { EditorView } from "prosemirror-view";

export const EditorViewContext = createContext<EditorView | null>(null);

export const useEditorView = () => {
  const ctx = useContext(EditorViewContext);
  console.log('ctx :: ', ctx);
  if (!ctx) {
    throw new Error('EditorViewContext is not provided');
  }

  return ctx;
}
