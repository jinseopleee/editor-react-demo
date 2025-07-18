import { setExtensionBaseOptions } from "../../extension-builder/setExtensionBaseOptions";
import * as R from 'remeda';
import { bulletList, liftListItem, listItem, orderedList, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import type { Editor } from "../../Editor";
import { setExtensionCommand } from "../../extension-builder/setExtensionCommand";
import { buildInputRules } from "./buildInputRules";
import { keymap } from "prosemirror-keymap";

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
    ],
  }),
  setExtensionCommand({
    toggleBulletList: (editor: Editor) => {
      // const { view, state } = editor;
      // const { bullet_list } = state.schema.nodes;
      // const parent = state.selection.$from.node(-2);
      // const inBullet = parent?.type === bullet_list;

      // if (inBullet) {
      //   // 이미 bullet list → paragraph로 해제
      //   liftListItem(state.schema.nodes.list_item)(state, view.dispatch);
      // } else {
      //   // bullet list 적용
      //   wrapInList(bullet_list)(state, view.dispatch);
      // }
      // view.focus();
      const { state, view } = editor;
      const { bullet_list, ordered_list, list_item } = state.schema.nodes;
      const { $from } = state.selection;

      console.log('$from :: ', $from);

      const parentList = $from.node(-2);
      console.log('parentList :: ', parentList);
      const inBullet = parentList?.type === bullet_list;
      const inOrdered = parentList?.type === ordered_list;

      console.log('inBullet :: ', inBullet);
      console.log('inOrdered :: ', inOrdered);

      if (inBullet) {
        liftListItem(list_item)(state, view.dispatch);
      } else if (inOrdered) {
        const tr = state.tr;
        const listPos = $from.before($from.depth - 1);
        tr.setNodeMarkup(listPos, undefined, bullet_list);
        view.dispatch(tr);
      } else {
        wrapInList(bullet_list)(state, view.dispatch);
      }
    },
    toggleOrderedList: (editor: Editor) => {
      // const { state, view } = editor;
      // const { ordered_list } = state.schema.nodes;
      // console.log('state.selection :: ', state.selection);
      // const { $from } = state.selection;
      // console.log('$from :: ', $from);
      // const parent = $from.node(-2);
      // console.log('parent :: ', parent);
      // const inOrdered = parent?.type === ordered_list;
      // console.log('inOrdered :: ', inOrdered);

      // if (inOrdered) {
      //   liftListItem(state.schema.nodes.list_item)(state, view.dispatch);
      // } else {
      //   wrapInList(ordered_list)(state, view.dispatch);
      // }
      // view.focus();
      const { state, view } = editor;
      const { ordered_list, bullet_list, list_item } = state.schema.nodes;
      const { $from, $to } = state.selection;
      console.log('selection :: ', $from, $to);
      const range = $from.blockRange($to);
      
      if (!range) return;

      console.log('range parent :: ', range.parent);

      const parent = range.parent;
      const inOrdered = parent.type === ordered_list;
      const inBullet = parent.type === bullet_list;

      if (inOrdered) {
        // 해제
        liftListItem(list_item)(state, view.dispatch);
      } else if (inBullet) {
        // bullet → ordered
        const listPos = range.start - 1;
        const tr = state.tr.setNodeMarkup(listPos, ordered_list);
        view.dispatch(tr);
      } else {
        wrapInList(ordered_list)(state, view.dispatch);
      }

      // view.focus();
    },
    isActive: (editor: Editor, listType: 'bullet' | 'ordered') => {
      const { $from } = editor.state.selection;
      const node = $from.node($from.depth);
      // console.log('node :: ', node.type.name);
      return node.type.name === listType;
    },
    canUse: (editor: Editor) => {
      return editor.existsPlugin('list');
    }
  })
) 
