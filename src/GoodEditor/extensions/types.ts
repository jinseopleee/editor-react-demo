import { type Command, Plugin } from "prosemirror-state";
import { type MarkSpec } from "prosemirror-model";

export type Extension = {
  keymap?: { [key: string]: Command },
  plugins?: Plugin[],
  marks?: { [name in string]: MarkSpec }
}
