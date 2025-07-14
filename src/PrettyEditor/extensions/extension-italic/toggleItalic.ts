import { EditorState } from "prosemirror-state";
import { Transaction } from "prosemirror-state";

export const toggleItalic = (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
  
  const { from, to, empty } = state.selection;
  const italicMark = state.schema.marks.italic;
  const tr = state.tr;
  
  if (empty) {
    // 커서만 있는 경우
    const isActive = state.storedMarks ? state.storedMarks.some(mark => mark.type === italicMark) : italicMark.isInSet(state.selection.$from.marks());

    if (isActive) {
      tr.removeStoredMark(italicMark);
    } else {
      tr.addStoredMark(italicMark.create());
    }

    dispatch?.(tr);
  } else {
    let allItalic = true;

    state.doc.nodesBetween(from, to, (node) => {
      if (!node.isText) {
        return;
      }

      const hasItalic = node.marks.some(mark => mark.type === italicMark);

      if (!hasItalic) {
        allItalic = false;
      }
    });

    if (allItalic) {
      tr.removeMark(from, to, italicMark);
    } else {
      tr.addMark(from, to, italicMark.create())
    }

    dispatch?.(tr);
  }
}
