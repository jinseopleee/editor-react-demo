import { useMemo, type PropsWithChildren } from "react";
import { PrettyEditorContext } from "./context"
import { Editor } from "./Editor";
import type { Extension } from "./types";

type PrettyEditorRootProps = PropsWithChildren<{
  extensions: Extension[];
}>

export const PrettyEditorRoot = ({ children, extensions }: PrettyEditorRootProps) => {
  const editor = useMemo(() => new Editor({ extensions }), [extensions]);

  return (
    <PrettyEditorContext.Provider value={{ editor }}>
      <div className="editor-container">
        {children}
      </div>
    </PrettyEditorContext.Provider>
  )
}
