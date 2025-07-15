import * as R from 'remeda';
import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import type { Editor } from '../../Editor';
import { keymap } from 'prosemirror-keymap';
import { createMarkerToggle } from '../../utils/createMarkerToggle';
import { setMarkExtensionCommands } from '../../extension-builder/setMarkExtensionCommands';
import { isMarkActive } from '../../utils/isMarkActive';

export const bold = R.pipe(
  setExtensionBaseOptions({
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
          createMarkerToggle(state.schema.marks.bold)(state, dispatch);
          return true;
        }
      })
    ],
  }),
  setMarkExtensionCommands({
    toggle: (editor: Editor) => {
      createMarkerToggle(editor.state.schema.marks.bold)(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    isActive: (editor: Editor) => {
      return isMarkActive(editor.state, editor.state.schema.marks.bold);
    },
    canUse: (editor: Editor) => {
      return editor.state.schema.marks.bold !== undefined;
    }
  })
);
