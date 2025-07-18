import { useMemo, type PropsWithChildren } from "react";
import { PrettyEditorContext } from "./context"
import { Editor } from "./Editor";
import { bold } from "./extensions/extension-bold/bold";
import { italic } from "./extensions/extension-italic/italic";
import { underline } from "./extensions/extension-underline/underline";
import { strike } from "./extensions/extension-strike/strike";
import type { ExtensionBaseOptions } from "./extension-builder/types";
import { align } from "./extensions/extension-align";
import { history } from "./extensions/extension-history";
import { list } from "./extensions/extension-list";
import { list2 } from "./extensions/extension-list2";

type PrettyEditorRootProps = PropsWithChildren<{
  extensions?: ExtensionBaseOptions[];
}>

export const PrettyEditorRoot = ({ children, extensions = [bold, italic, underline, strike,  history, list2] }: PrettyEditorRootProps) => {
  const editor = useMemo(() => new Editor({ extensions }), [extensions]);

  return (
    <PrettyEditorContext.Provider value={{ editor }}>
      <div className="editor-container">
        {children}
      </div>
    </PrettyEditorContext.Provider>
  )
}
