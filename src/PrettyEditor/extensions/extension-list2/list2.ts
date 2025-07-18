import * as R from 'remeda';
import { setExtensionBaseOptions } from '../../extension-builder/setExtensionBaseOptions';
import { bulletListNode, listItemNode, orderedListNode } from './nodes';
import { setExtensionCommand } from '../../extension-builder/setExtensionCommand';
import { buildInputRules } from './buildInputRules';
import { keymap } from 'prosemirror-keymap';
import { toggleListCommand } from './commands';

export const list2 = R.pipe(
  setExtensionBaseOptions({
    name: 'list',
    nodes: {
      listItem: listItemNode,
      bulletList: bulletListNode,
      orderedList: orderedListNode,
    },
    plugins: (schema) => [
      buildInputRules(schema),
      keymap({
        'Shift-Ctrl-8': toggleListCommand(schema.nodes.orderedList),
        'Shift-Ctrl-9': toggleListCommand(schema.nodes.bulletList),
        // 'Enter': splitListItem(schema.nodes.listItem),
        // 'Mod-[': liftListItem(schema.nodes.listItem),
        // 'Mod-]': sinkListItem(schema.nodes.listItem),
        // 'Enter': splitListItem()
      }),
    ]
  })
  // setExtensionCommand({  
  // })
)
