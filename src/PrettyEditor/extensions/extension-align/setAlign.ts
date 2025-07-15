import type { Command, EditorState, Transaction } from "prosemirror-state";

export const setAlign = (align: 'left' | 'center' | 'right' | 'justify'): Command => {
  return (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
    const { from, to } = state.selection;
    let tr = state.tr;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'paragraph') {
        tr = tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          align,
        });
      }
    });

    if (tr.docChanged) {
      dispatch?.(tr);
      return true;
    }

    return false;
  }
}