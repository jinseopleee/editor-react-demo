import type { Extension } from "../../types";
import { toggleItalic } from "./toggleItalic";
import { keymap } from "prosemirror-keymap";
import type { Editor } from "../../Editor";
import { isMarkActive } from "../../utils/isMarkActive";

export const italic: Extension = {
  id: 'italic',
  marks: {
    italic: {
      parseDOM: [
        { tag: 'em' }, 
        {
          style: 'font-style',
          getAttrs: value => /^(italic|oblique)$/.test(value) && null,
        }
      ],
      toDOM() { return ['em', 0] }
    },
  },
  plugins: [
    keymap({
      'Mod-i': (state, dispatch) => {
        toggleItalic(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleItalic: (editor) => {
      const state = editor.state;
      const dispatch = editor.view.dispatch;
      toggleItalic(state, dispatch);
      editor.view.focus();
    }
  },
  active: (editor: Editor) => {
    return isMarkActive(editor.state, editor.state.schema.marks.italic);
  }
}
