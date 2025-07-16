import * as R from 'remeda';
import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import { setMarkExtensionCommands } from '../../extension-builder/setMarkExtensionCommands';
import { keymap } from 'prosemirror-keymap';
import { createMarkerToggle } from '../../utils/createMarkerToggle';
import type { Editor } from '../../Editor';
import { isMarkActive } from '../../utils/isMarkActive';

export const strike = R.pipe(
  setExtensionBaseOptions({
    name: 'strike',
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
    ]
  }),
  setMarkExtensionCommands({
    toggle: (editor: Editor) => {
      createMarkerToggle(editor.state.schema.marks.strikethrough)(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    isActive: (editor: Editor) => {
      return isMarkActive(editor.state, editor.state.schema.marks.strikethrough);
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('strike');
    }
  })
);
