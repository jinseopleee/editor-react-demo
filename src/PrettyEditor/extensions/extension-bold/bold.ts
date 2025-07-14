import type { Extension } from "../../types";
import { toggleBold } from "./toggleBold";
import { keymap } from "prosemirror-keymap";
import type { Editor } from "../../Editor";
import { isMarkActive } from "../../utils/isMarkActive";

export const bold: Extension = {
  id: 'bold',
  marks: {
    bold: {
      parseDOM: [
        { tag: 'strong', getAttrs: () => null },
        { tag: 'b', getAttrs: () => null },
        {
          style: 'font-weight',
          getAttrs: value => /^(bold|700)$/.test(value) && null,
        }
      ],
      toDOM() { return ['strong', 0] }
    },
  },
  plugins: [
    keymap({
      'Mod-b': (state, dispatch) => {
        toggleBold(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleBold: (editor) => {
      const state = editor.state;
      const dispatch = editor.view.dispatch;
      toggleBold(state, dispatch);
      editor.view.focus();
    }
  },
  active: (editor: Editor) => {
    return isMarkActive(editor.state, editor.state.schema.marks.bold);
  }
}
