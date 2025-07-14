import { useSubscribe } from "./useSubscribe";
import type { Editor } from "../Editor";

export const useEditorStateSelector = <T>(editor: Editor, selector: (editor: Editor) => T) => {
  return useSubscribe({
    subscribe: editor.subscribe,
    getSnapshot: () => editor,
    selector,
  });
}
