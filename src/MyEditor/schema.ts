import { Schema } from "prosemirror-model";

export const schema = new Schema({
  nodes: {
    doc: { content: "block+" },
    paragraph: { 
      content: "text*",
      group: "block",
      parseDOM: [{ tag: 'p' }],
      toDOM() { return ['p', { class: 'paragraph' }, 0] }
    },
    text: {}
  },
  marks: {
    bold: {
      parseDOM: [
        { tag: 'strong', getAttrs: () => null },
        { tag: 'b', getAttrs: () => null },
        {
          style: 'font-weight',
          getAttrs: value => /^(bold|700)$/.test(value) && null,
        }
      ],
      toDOM() { return ['strong', 0] }
    },
    italic: {
      parseDOM: [
        { tag: 'em', getAttrs: () => null },
        { tag: 'i', getAttrs: () => null },
        {
          style: 'font-style',
          getAttrs: value => /^(italic|oblique)$/.test(value) && null,
        }
      ],
      toDOM() { return ['em', 0] }
    }
  }
});