import type { MarkSpec, NodeSpec, Schema } from "prosemirror-model";
import type { Plugin } from "prosemirror-state";

export type ExtensionBaseOptions = {
  name: string;
  marks: Record<string, MarkSpec>;
  nodes: Record<string, NodeSpec>;
  plugins: Plugin[] | ((schema: Schema) => Plugin[]);
}
