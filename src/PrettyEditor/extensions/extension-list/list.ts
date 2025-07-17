import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import * as R from 'remeda';
import { bulletList, liftListItem, listItem, orderedList, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import type { Editor } from "../../Editor";
import { setExtensionCommand } from "../../extension-builder/setExtensionCommand";
import { buildInputRules } from "./buildInputRules";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

export const list = R.pipe(
  setExtensionBaseOptions({
    name: 'list',
    nodes: {
      ordered_list: {...orderedList, content: 'list_item+', group: 'block'},
      bullet_list: {...bulletList, content: 'list_item+', group: 'block'},
      list_item: {
        ...listItem,
        content: 'paragraph block*',
      },
    },
    plugins: (schema) => [
      buildInputRules(schema),
      keymap({
        'Shift-Ctrl-8': wrapInList(schema.nodes.ordered_list),
        'Shift-Ctrl-9': wrapInList(schema.nodes.bullet_list),
        'Enter': splitListItem(schema.nodes.list_item),
        'Mod-[': liftListItem(schema.nodes.list_item),
        'Mod-]': sinkListItem(schema.nodes.list_item),
      }),
      keymap(baseKeymap)
    ],
  }),
  setExtensionCommand({
    toggleBulletList: (editor: Editor) => {
      const { view, state } = editor;
      const nodeType = state.schema.nodes.bullet_list;
      if (!nodeType) return;
  
      console.log(state.selection.from, state.selection.to, state.selection.empty);
      console.log('toggleBulletList');
      const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos) => {
      console.log('selected node:', node.type.name, node.attrs);
    });
    console.log('paragraph group:', state.schema.nodes.paragraph.group);

      const result = wrapInList(nodeType)(state, view.dispatch);
      console.log(result);
      view.focus();
    },
    toggleOrderedList: (editor: Editor) => {
      const { view, state } = editor;
      const nodeType = state.schema.nodes.ordered_list;
      if (!nodeType) return;
  
      wrapInList(nodeType)(state, view.dispatch);
      view.focus();
    },
    isActive: (editor: Editor, listType: 'bullet' | 'ordered') => {
      const { $from } = editor.state.selection;
      const node = $from.node($from.depth);
      return node.type.name === listType;
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('list');
    }
  })
) 