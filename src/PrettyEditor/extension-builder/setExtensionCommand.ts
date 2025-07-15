import type { ExtensionBaseOptions } from "./types";

export const setExtensionCommand = <Extra extends Record<string, unknown>>(extra: Extra) => <Base extends ExtensionBaseOptions>(base: Base) => ({
  ...base,
  commands: extra,
});
