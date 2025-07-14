import type { Editor } from "../../Editor";
import type { Extension } from "../../types"
import { createMarkerToggle } from "../../utils/createMarkerToggle";
import { keymap } from "prosemirror-keymap";
import { isMarkActive } from "../../utils/isMarkActive";

export const strike: Extension = {
  id: 'strikethrough',
  marks: {
    strikethrough: {
      parseDOM: [
        { tag: 'strike', getAttrs: () => null },
        {
          style: 'text-decoration',
          getAttrs: value => /^(line-through)$/.test(value) && null,
        }
      ],
      toDOM() { return ['strike', 0] }
    }
  },
  plugins: [
    keymap({
      'Mod-s': (state, dispatch) => {
        createMarkerToggle(state.schema.marks.strikethrough)(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleStrikethrough: (editor) => {
      createMarkerToggle(editor.state.schema.marks.strikethrough)(editor.state, editor.view.dispatch);
      editor.view.focus();
    }
  },
  active: (editor: Editor) => {
    return isMarkActive(editor.state, editor.state.schema.marks.strikethrough);
  }
}
