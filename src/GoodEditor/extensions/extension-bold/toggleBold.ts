import { EditorState, Transaction } from "prosemirror-state";

export const toggleBold = (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
  const { from, to, empty } = state.selection;
  const boldMark = state.schema.marks.bold;
  const tr = state.tr;
  
  
}
