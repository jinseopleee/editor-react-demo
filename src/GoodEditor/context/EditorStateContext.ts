import type { EditorState } from "prosemirror-state";
import { createContext, useContext } from "react";

export const EditorStateContext = createContext<EditorState | null>(null);

export const useEditorState = () => {
  const state = useContext(EditorStateContext);
  if (!state) {
    throw new Error('EditorStateContext is not provided');
  }

  return state;
}
