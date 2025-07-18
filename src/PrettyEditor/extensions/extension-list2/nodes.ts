import type { NodeSpec } from "prosemirror-model";

export const listItemNode: NodeSpec = {
  content: 'paragraph block*',
  // defining: true,
  parseDOM: [
    {
      tag: 'li',
    },
  ],
  toDOM: () => ['li', 0],
};

export const bulletListNode: NodeSpec = {
  content: 'listItem+',
  group: 'block',
  parseDOM: [{ tag: 'ul' }],
  toDOM: () => ['ul', 0],
};

export const orderedListNode: NodeSpec = {
  content: 'listItem+',
  group: 'block',
  attrs: {
    order: { default: 1, validate: 'number' },
  },
  parseDOM: [
    {
      tag: 'ol',
      getAttrs(dom) {
        const start = dom.getAttribute('start');
        return {
          order: start ? +start : 1,
        };
      }
    }
  ],
  toDOM(node) {
    return node.attrs.order === 1 
      ? ['ol', 0]
      : ['ol', { start: node.attrs.order }, 0];
  },
};
