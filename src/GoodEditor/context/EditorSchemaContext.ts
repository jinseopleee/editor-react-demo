import { createContext, useContext } from "react";
import { type Schema } from "prosemirror-model";

export const EditorSchemaContext = createContext<Schema | null>(null);

export const useEditorSchema = () => {
  const ctx = useContext(EditorSchemaContext);
  if (!ctx) throw new Error('EditorSchemaContext not found');
  return ctx;
};