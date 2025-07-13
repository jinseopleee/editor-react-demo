import { useEditorContext, useEditorSelection } from "../context/EditorContext";

export const EditorToolbar = () => {
  const { commands, viewRef, schema } = useEditorContext();
  const view = viewRef.current;
  const selection = useEditorSelection();

  const isBoldActive = () => {
    if (!view || !schema.marks.bold || !selection) return false;
    const { from, to, empty } = selection;
    const type = schema.marks.bold;
    return empty
      ? !!type.isInSet(view.state.storedMarks || view.state.selection.$from.marks())
      : view.state.doc.rangeHasMark(from, to, type);
  };

  return (
    <div>
      <button
        onClick={() => commands.bold?.toggleBold?.()}
        style={{ fontWeight: isBoldActive() ? 'bold' : 'normal' }}>
        B
      </button>
    </div>
  );
};