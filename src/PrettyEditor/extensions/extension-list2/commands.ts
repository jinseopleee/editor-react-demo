import { Fragment, Node, type NodeType } from "prosemirror-model";
import { TextSelection, type Command } from "prosemirror-state";

/**
 * 선택된 블록을 bullet list 또는 ordered list로 감쌉니다
 * 
 * ex)
 * 항목
 * 항목 아이템
 * 
 * 위에서 "항목"과 "항목 아이템"을 드래그 한 상태에서 wrapInListCommand를 실행한다면
 * 아래와 같이 변경됩니다.
 * 
 * 1. 항목
 * 2. 항목 아이템
 * 
 * 또는, "항목" 을 드래그 하거나 커서를 둔 상태에서 wrapInListCommand를 실행한다면
 * 아래와 같이 변경됩니다.
 * 
 * 1. 항목
 * 항목 아이템
 * 
 * 이미 리스트인 경우는 아래와 같이 동작합니다.
 * 
 * wrapInListCommand(bullet_list)
 * 만약 선택된 블록이 리스트가 아니라면 bullet_list로 감쌉니다.
 * 만약 선택된 블록이 bullet_list라면 list를 해제합니다.
 * 만약 선택된 블록이 ordered_list라면 ordered_list를 bullet_list로 변경합니다.
 * 
 * wrapInListCommand(ordered_list)
 * 만약 선택된 블록이 리스트가 아니라면 ordered_list로 감쌉니다.
 * 만약 선택된 블록이 ordered_list라면 list를 해제합니다.
 * 만약 선택된 블록이 bullet_list라면 bullet_list를 ordered_list로 변경합니다.
 */
export const wrapInListCommand = (listType: NodeType): Command => {
  return (state, dispatch) => {
    const { schema, selection } = state;
    const { from, to } = selection;
    console.log('from :: ', from);
    console.log('to :: ', to);
    const listItemType = schema.nodes.listItem;

    if (!listType || !listItemType) return false;

    const range = selection.$from.blockRange(selection.$to);
    if (!range) return false;

    const tr = state.tr;

    const items: Node[] = [];
    state.doc.nodesBetween(range.start, range.end, (node) => {
      if (node.type === schema.nodes.paragraph) {
        const listItem = listItemType.create(null, node);
        items.push(listItem);
      }
    });

    if (!items.length) return false;

    const listNode = listType.create(null, items);
    tr.replaceRangeWith(range.start, range.end, listNode);
    
    const insertPos = tr.mapping.map(range.start);
    const before = tr.doc.resolve(insertPos).nodeBefore;
    if (before && before.type === listType) {
      tr.join(insertPos);
    }

    /// ---------

    // const newSelection = state.selection.map(tr.doc, tr.mapping);
    // tr.setSelection(newSelection);
    // const { from, to } = state.selection;

    // const mappedFrom = tr.mapping.map(from, -1);
    // const mappedTo = tr.mapping.map(to, -1);
    // tr.setSelection(TextSelection.create(tr.doc, mappedFrom, mappedTo)).scrollIntoView();
    const isRange = !selection.empty;

    if (isRange) {
      const mappedFrom = tr.mapping.map(selection.from, -1);
      const mappedTo   = tr.mapping.map(selection.to,   +1);

      tr.setSelection(TextSelection.create(tr.doc, mappedFrom, mappedTo)).scrollIntoView();
    } else {
      const offsetInsidePara = selection.$from.parentOffset; // selection.from - range.start;
      let $list = tr.doc.resolve(insertPos);
      if ($list.nodeAfter?.type !== schema.nodes.listItem) {
        $list = tr.doc.resolve(insertPos + 1);
      }
      const newPos = $list.pos + 1 + 1 + offsetInsidePara;
      tr.setSelection(TextSelection.create(tr.doc, newPos)).scrollIntoView();
    }
    /// ---------

    if (dispatch) dispatch(tr);
    return true;

    // const resolvedPos = tr.doc.resolve(range.start);
    // console.log('resolvedPos :: ', resolvedPos);
    // if (dispatch) dispatch(tr);
    // return true

    // // 선택된 블록들을 리스트로 감싸기
    // const items: Node[] = [];
    // state.doc.nodesBetween(from, to, (node) => {
    //   if (node.type === schema.nodes.paragraph) {
    //     const listItem = listItemType.create(null, node);
    //     items.push(listItem);
    //   }
    // });

    // if (!items.length) return false;

    // const listNode = listType.create(null, Fragment.fromArray(items));
    // tr.replaceRangeWith(from, to, listNode);

    // // 새로운 리스트로 커서 이동
    // const resolvedPos = tr.doc.resolve(from + 1);
    // tr.setSelection(TextSelection.near(resolvedPos));
    // if (dispatch) dispatch(tr);
    // return true;
  };
}

export const toggleListCommand = (listType: NodeType): Command => {
  return (state, dispatch) => {
    const { schema } = state;
    const listItemType = schema.nodes.listItem;

    if (!listType || !listItemType) return false;

    // 현재 커서가 어떤 리스트에 있는지 확인
    const $from = state.selection.$from;
    let depth = $from.depth;

    // console.log("현재 커서가 어떤 리스트에 있는지? :: ", depth);

    // for (let d = $from.depth; d >= 0; d--) {
    //   console.log('d :: ', d);
    //   console.log('node :: ', $from.node(d).type.name);
    // }

    while (depth > 0) {
      const node = $from.node(depth);
      if (node.type === schema.nodes.bulletList || node.type === schema.nodes.orderedList) {
        const listPos = $from.before(depth);
        console.log('listPos :: ', listPos);

        if (node.type === listType) {
          // 현재와 같은 리스트 → 해제
          if (dispatch) {
            console.log('현재와 같은 리스트 → 해제')
            const tr = state.tr.lift($from.blockRange()!, depth - 1);
            dispatch(tr);
          }
        } else {
          // 리스트 타입 변경
          if (dispatch) {
            console.log('리스트 타입 변경')
            const tr = state.tr.setNodeMarkup(listPos, listType);
            dispatch(tr);
          }
        }
        return true;
      }
      depth--;
    }

    console.log('리스트가 아님!')

    // 리스트가 아님 → 새로 wrap
    return wrapInListCommand(listType)(state, dispatch);
  };
}


/**
 * 현재 리스트에서 선택된 항목의 depth를 한단계 위로 올립니다.
 * ex)
 * 1. 항목
 *   1. 항목 아이템
 * 
 * 위에서 항목 아이템을 드래그 한 상태이거나 커서를 둔 상태에서 liftListCommand를 실행한다면
 * 아래와 같이 변경됩니다.
 * 
 * 1. 항목
 * 2. 항목 아이템
 * 
 * 이때 더이상 위로 올라갈 depth가 없다면 아래와 같이 list가 해제됩니다.
 * 
 * 항목
 * 항목 아이템
 */
export const liftListCommand = () => {}

export const sinkListCommand = () => {}

/**
 * 현재 리스트에서 선택된 항목의 depth를 한단계 아래로 내립니다.
 */
