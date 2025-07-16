import * as R from 'remeda';
import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import { history as historyPlugin, undo, redo, undoDepth, redoDepth } from 'prosemirror-history';
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
      editor.view.focus();
    },
    redo: (editor: Editor) => {
      redo(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    canUndo: (editor: Editor) => {
      return undoDepth(editor.state) > 0;
    },
    canRedo: (editor: Editor) => {
      return redoDepth(editor.state) > 0;
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('history');
    }
  })
)
