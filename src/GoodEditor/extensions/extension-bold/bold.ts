import type { Extension } from "../types";
import { toggleBold } from "./toggleBold";
import { Plugin } from "prosemirror-state";
import { isMarkActive } from "./isMarkActive";

export const bold: Extension = {
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
  },
  keymap: {
    'Mod-b': (state, dispatch) => {
      toggleBold(state, dispatch);
      return true;
    }
  },
  plugins: [
    new Plugin({
      view: () => {
        return {
          update: (view) => {
            const bold = view.state.schema.marks.bold;
            const active = isMarkActive(view.state, bold);
            console.log(active);
          }
        }
      }
    }),
  ]
}
