import type { Schema } from "prosemirror-model";
import type { EditorState } from "prosemirror-state";
import type { EditorView } from "prosemirror-view";
import { createContext, useContext, useSyncExternalStore } from "react";

type EditorContextType = {
  ref: React.RefObject<HTMLDivElement | null>;
  viewRef: React.RefObject<EditorView | null>;
  schema: Schema;
  stateRef: React.RefObject<EditorState>;
  commands: Record<string, Record<string, () => void>>;
  onChange?: (value: string) => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('EditorContext not found');
  return ctx;
};

export const useEditorSelection = () => {
  const { viewRef } = useEditorContext();

  return useSyncExternalStore(
    (callback) => {
      const view = viewRef.current;
      if (!view || !view.dom || !view.dom.parentNode) return () => {};

      const handler = () => {
        callback();
        return false;
      };

      const oldProps = view.props;
      view.setProps({
        ...oldProps,
        handleDOMEvents: {
          ...oldProps.handleDOMEvents,
          selectionchange: handler,
        },
      });

      return () => {
        view.setProps({
          ...oldProps,
          handleDOMEvents: {
            ...oldProps.handleDOMEvents,
            selectionchange: undefined,
          },
        });
      };
    },
    () => viewRef.current?.state.selection,
  );
};