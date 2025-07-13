import { createContext, useContext } from "react";
import { Editor } from "./Editor";

type PrettyEditorContextType = {
  editor: Editor;
}

export const PrettyEditorContext = createContext<PrettyEditorContextType | null>(null);

export const usePrettyEditorContext = () => {
  const ctx = useContext(PrettyEditorContext);
  if (!ctx) throw new Error('PrettyEditorContext not found');
  return ctx;
};