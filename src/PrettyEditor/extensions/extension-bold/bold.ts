import type { Extension } from "../types";
import { toggleBold } from "./toggleBold";
import { keymap } from "prosemirror-keymap";

export const bold: Extension = {
  id: 'bold',
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
  plugins: [
    keymap({
      'Mod-b': (state, dispatch) => {
        console.log('toggleBold :: ', state, dispatch);
        toggleBold(state, dispatch);
        return true;
      }
    })
  ],
  commands: {
    toggleBold: (view) => {
      const state = view.state;
      const dispatch = view.dispatch;
      toggleBold(state, dispatch);
      return true;
    }
  }
}
