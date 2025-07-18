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
    const listItemType = schema.nodes.listItem;

    if (!listType || !listItemType) return false;

    const range = selection.$from.blockRange(selection.$to);
    if (!range) return false;

    const tr = state.tr;

    // 선택된 블록들을 리스트로 감싸기
    const items: Node[] = [];
    state.doc.nodesBetween(from, to, (node) => {
      if (node.type === schema.nodes.paragraph) {
        const listItem = listItemType.create(null, node);
        items.push(listItem);
      }
    });

    if (!items.length) return false;

    const listNode = listType.create(null, Fragment.fromArray(items));
    tr.replaceRangeWith(from, to, listNode);

    // 새로운 리스트로 커서 이동
    const resolvedPos = tr.doc.resolve(from + 1);
    tr.setSelection(TextSelection.near(resolvedPos));
    if (dispatch) dispatch(tr);
    return true;
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

    while (depth > 0) {
      const node = $from.node(depth);
      if (node.type === schema.nodes.bulletList || node.type === schema.nodes.orderedList) {
        const listPos = $from.before(depth);

        if (node.type === listType) {
          // 현재와 같은 리스트 → 해제
          if (dispatch) {
            const tr = state.tr.lift($from.blockRange()!, depth - 1);
            dispatch(tr);
          }
        } else {
          // 리스트 타입 변경
          if (dispatch) {
            const tr = state.tr.setNodeMarkup(listPos, listType);
            dispatch(tr);
          }
        }
        return true;
      }
      depth--;
    }

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
