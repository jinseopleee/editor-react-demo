import type { MarkType } from "prosemirror-model";
import type { EditorState } from "prosemirror-state";

export const isMarkActive = (state: EditorState, markType: MarkType) => {
  const { from, $from, to, empty } = state.selection;
  
  if (empty) {
    return !!markType.isInSet(state.storedMarks || $from.marks());
  }

  let found = false;

  state.doc.nodesBetween(from, to, (node) => {
    if (markType.isInSet(node.marks)) {
      found = true;
      return false;
    }
  });

  return found;
}
