import type { MarkType } from "prosemirror-model";
import type { EditorState } from "prosemirror-state";

export const isMarkActive = (state: EditorState, markType: MarkType) => {
  const { from, $from, to, empty } = state.selection;

  if (empty) {
    return !!markType.isInSet(state.storedMarks || $from.marks());
  }

  return !!state.doc.rangeHasMark(from, to, markType);
}
