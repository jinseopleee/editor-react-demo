import type { OptionalExcept } from "../types";
import type { ExtensionBaseOptions } from "./types";

export const setExtensionBaseOptions = (options: OptionalExcept<ExtensionBaseOptions, 'name'>): ExtensionBaseOptions => ({
  name: options.name,
  marks: options.marks ?? {},
  nodes: options.nodes ?? {},
  plugins: options.plugins ?? [],
});
