import { EditorState } from "prosemirror-state";
import { Transaction } from "prosemirror-state";

export const toggleBold = (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
  const { from, to, empty } = state.selection;
  const boldMark = state.schema.marks.bold;
  const tr = state.tr;
  
  if (empty) {
    // 커서만 있는 경우
    const isActive = state.storedMarks ? state.storedMarks.some(mark => mark.type === boldMark) : boldMark.isInSet(state.selection.$from.marks());

    if (isActive) {
      tr.removeStoredMark(boldMark);
    } else {
      tr.addStoredMark(boldMark.create());
    }

    dispatch?.(tr);
  } else {
    let allBold = true;

    state.doc.nodesBetween(from, to, (node) => {
      if (!node.isText) {
        return;
      }

      const hasBold = node.marks.some(mark => mark.type === boldMark);

      if (!hasBold) {
        allBold = false;
      }
    });

    if (allBold) {
      tr.removeMark(from, to, boldMark);
    } else {
      tr.addMark(from, to, boldMark.create())
    }

    dispatch?.(tr);
  }
}
