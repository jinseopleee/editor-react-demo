import type { Editor } from "../Editor";
import type { ExtensionBaseOptions } from "./types";

type MarkExtensionCommands = {
  toggle: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  canUse: (editor: Editor) => boolean;
}

export const setMarkExtensionCommands = (commands: MarkExtensionCommands) => (base: ExtensionBaseOptions) => ({
  ...base,
  commands: {
    toggle: (editor: Editor) => commands.toggle(editor),
    isActive: (editor: Editor) => commands.isActive(editor),
    canUse: (editor: Editor) => commands.canUse(editor),
  },
});