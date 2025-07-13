import { type Command, Plugin } from "prosemirror-state";
import { type MarkSpec, type NodeSpec } from "prosemirror-model";
import type { EditorView } from "prosemirror-view";

export type Extension = {
  id: string; // 고유 ID (ex: 'bold', 'image')

  marks?: Record<string, MarkSpec>;
  nodes?: Record<string, NodeSpec>;

  plugins?: Plugin[];
  keymap?: Record<string, Command>;

  commands?: Record<string, (view: EditorView) => void>;
};
