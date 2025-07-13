import type { PropsWithChildren } from "react";

export const EditorContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="good-editor-container">
      {children}
    </div>
  )
}