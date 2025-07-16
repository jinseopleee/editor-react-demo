import * as R from 'remeda';
import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import { history as historyPlugin, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { setExtensionCommand } from '../../extension-builder/setExtensionCommand';
import type { Editor } from '../../Editor';

export const history = R.pipe(
  setExtensionBaseOptions({
    name: 'history',
    plugins: [
      historyPlugin(),
      keymap({
        'Mod-z': (state, dispatch) => {
          undo(state, dispatch);
          return true;
        },
        'Mod-y': (state, dispatch) => {
          redo(state, dispatch);
          return true;
        }
      })
    ],
  }),
  setExtensionCommand({
    undo: (editor: Editor) => {
      undo(editor.state, editor.view.dispatch);
    },
    redo: (editor: Editor) => {
      redo(editor.state, editor.view.dispatch);
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('history');
    }
  })
)
