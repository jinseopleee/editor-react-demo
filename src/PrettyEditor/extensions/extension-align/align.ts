import * as R from 'remeda';
import { setExtensionBaseOptions } from '../../extension-builder/setExtensionBaseOptions';
import type { Editor } from '../../Editor';
import { setExtensionCommand } from '../../extension-builder/setExtensionCommand';
import { setAlign } from './setAlign';
import { keymap } from 'prosemirror-keymap';

export const align = R.pipe(
  setExtensionBaseOptions({
    nodes: {
      paragraph: {
        content: 'text*',
        group: 'block',
        attrs: {
          align: {
            default: 'left',
          },
        },
        parseDOM: [
          {
            tag: 'p',
            getAttrs: (dom: HTMLElement) => ({
              align: dom.style.textAlign || 'left',
            }),
          },
        ],
        toDOM: (node) => {
          const { align } = node.attrs;
          return ['p', { style: `text-align: ${align};` }, 0];
        }
      }
    },
    plugins: [
      keymap({
        'Mod-l': setAlign('left'),
        'Mod-e': setAlign('center'),
        'Mod-r': setAlign('right'),
        'Mod-j': setAlign('justify'),
      })
    ]
  }),
  setExtensionCommand({
    toggleAlign: (editor: Editor, align: 'left' | 'center' | 'right' | 'justify') => {
      setAlign(align)(editor.state, editor.view.dispatch);
      editor.view.focus();
    },
    isActive: (editor: Editor, align: 'left' | 'center' | 'right' | 'justify') => {
      const { $from } = editor.state.selection;
      const node = $from.node($from.depth);
      return node.type.name === 'paragraph' && node.attrs.align === align;
    }
  })
)
