import type { MarkSpec, NodeSpec } from "prosemirror-model";
import type { Plugin } from "prosemirror-state";

export type ExtensionBaseOptions = {
  marks: Record<string, MarkSpec>;
  nodes: Record<string, NodeSpec>;
  plugins: Plugin[];
}