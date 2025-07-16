import type { ExtensionBaseOptions } from "./types";

export const setExtensionBaseOptions = (options: ExtensionBaseOptions): Required<ExtensionBaseOptions> => ({
  name: options.name,
  marks: options.marks ?? {},
  nodes: options.nodes ?? {},
  plugins: options.plugins ?? [],
});
