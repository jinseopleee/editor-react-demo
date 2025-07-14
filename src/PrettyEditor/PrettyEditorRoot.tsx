import { useMemo, type PropsWithChildren } from "react";
import { PrettyEditorContext } from "./context"
import { Editor } from "./Editor";
import type { Extension } from "./types";
import { bold } from "./extensions/extension-bold/bold";
import { italic } from "./extensions/extension-italic/italic";
import { underline } from "./extensions/extension-underline/underline";
import { strike } from "./extensions/extension-strike/strike";

type PrettyEditorRootProps = PropsWithChildren<{
  extensions?: Extension[];
}>

export const PrettyEditorRoot = ({ children, extensions = [bold, italic, underline, strike] }: PrettyEditorRootProps) => {
  const editor = useMemo(() => new Editor({ extensions }), [extensions]);

  return (
    <PrettyEditorContext.Provider value={{ editor }}>
      <div className="editor-container">
        {children}
      </div>
    </PrettyEditorContext.Provider>
  )
}
