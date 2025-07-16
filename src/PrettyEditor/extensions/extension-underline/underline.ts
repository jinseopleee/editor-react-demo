import * as R from 'remeda';
import { setExtensionBaseOptions } from '../../extension-builder/setExtensionBaseOptions';
import { setMarkExtensionCommands } from '../../extension-builder/setMarkExtensionCommands';
import { keymap } from 'prosemirror-keymap';
import { createMarkerToggle } from '../../utils/createMarkerToggle';
import type { Editor } from '../../Editor';
import { isMarkActive } from '../../utils/isMarkActive';

export const underline = R.pipe(
  setExtensionBaseOptions({
    name: 'underline',
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
    ]
  }),
  setMarkExtensionCommands({
    toggle: (editor: Editor) => {
      createMarkerToggle(editor.state.schema.marks.underline)(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    isActive: (editor: Editor) => {
      return isMarkActive(editor.state, editor.state.schema.marks.underline);
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('underline');
    }
  }),
);
