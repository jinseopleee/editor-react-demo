import type { Extension } from "../../types";
import { keymap } from "prosemirror-keymap";
import { createMarkerToggle } from "../../utils/createMarkerToggle";
import type { Editor } from "../../Editor";
import { isMarkActive } from "../../utils/isMarkActive";

export const underline: Extension = {
  id: 'underline',
  marks: {
    underline: {
      parseDOM: [
        { tag: 'u', getAttrs: () => null },
        {
          style: 'text-decoration',
          getAttrs: value => /^(underline)$/.test(value) && null,
        }
      ],
      toDOM() { return ['u', 0] }
    }
  },
  plugins: [
    keymap({
      'Mod-u': (state, dispatch) => {
        createMarkerToggle(state.schema.marks.underline)(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleUnderline: (editor) => {
      createMarkerToggle(editor.state.schema.marks.underline)(editor.state, editor.view.dispatch);
      editor.view.focus();
    }
  },
  active: (editor: Editor) => {
    return isMarkActive(editor.state, editor.state.schema.marks.underline);
  }
}
