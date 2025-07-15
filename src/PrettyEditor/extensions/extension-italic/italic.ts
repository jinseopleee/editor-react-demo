import * as R from 'remeda';
import { setExtensionBaseOptions } from '../../extension-builder/setExtensionBaseOptions';
import { setMarkExtensionCommands } from '../../extension-builder/setMarkExtensionCommands';
import { keymap } from 'prosemirror-keymap';
import { createMarkerToggle } from '../../utils/createMarkerToggle';
import type { Editor } from '../../Editor';
import { isMarkActive } from '../../utils/isMarkActive';

export const italic = R.pipe(
  setExtensionBaseOptions({
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
      }
    },
    plugins: [
      keymap({
        'Mod-i': (state, dispatch) => {
          createMarkerToggle(state.schema.marks.italic)(state, dispatch);
          return true;
        }
      })
    ]
  }),
  setMarkExtensionCommands({
    toggle: (editor: Editor) => {
      createMarkerToggle(editor.state.schema.marks.italic)(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    isActive: (editor: Editor) => {
      return isMarkActive(editor.state, editor.state.schema.marks.italic);
    },
    canUse: (editor: Editor) => {
      return editor.state.schema.marks.italic !== undefined;
    }
  })
)
