import type { Extension } from "../../types";
import { keymap } from "prosemirror-keymap";
import type { Editor } from "../../Editor";
import { isMarkActive } from "../../utils/isMarkActive";
import { createMarkerToggle } from "../../utils/createMarkerToggle";

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
        createMarkerToggle(state.schema.marks.italic)(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleItalic: (editor) => {
      createMarkerToggle(editor.state.schema.marks.italic)(editor.state, editor.view.dispatch);
      editor.view.focus();
    }
  },
  active: (editor: Editor) => {
    return isMarkActive(editor.state, editor.state.schema.marks.italic);
  }
}
