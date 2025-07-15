import type { ExtensionBaseOptions } from "./types";

export const setExtensionBaseOptions = (options: Partial<ExtensionBaseOptions>): ExtensionBaseOptions => ({
  marks: options.marks ?? {},
  nodes: options.nodes ?? {},
  plugins: options.plugins ?? [],
});
