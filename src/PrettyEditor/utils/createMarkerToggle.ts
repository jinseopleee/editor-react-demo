import { EditorState } from "prosemirror-state";
import type { MarkType } from "prosemirror-model";
import { Transaction } from "prosemirror-state";

export const createMarkerToggle = (mark: MarkType) => (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
  const { from, to, empty } = state.selection;
  const tr = state.tr;
  
  if (empty) {
    // 커서만 있는 경우
    const isActive = state.storedMarks ? state.storedMarks.some(storedMark => storedMark.type === mark) : mark.isInSet(state.selection.$from.marks());

    if (isActive) {
      tr.removeStoredMark(mark);
    } else {
      tr.addStoredMark(mark.create());
    }

    dispatch?.(tr);
  } else {
    let allMark = true;

    state.doc.nodesBetween(from, to, (node) => {
      if (!node.isText) {
        return;
      }

      const hasMark = node.marks.some(m => m.type === mark);

      if (!hasMark) {
        allMark = false;
      }
    });

    if (allMark) {
      tr.removeMark(from, to, mark);
    } else {
      tr.addMark(from, to, mark.create())
    }

    dispatch?.(tr);
  }
}
