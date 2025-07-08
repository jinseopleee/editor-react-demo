import { useEffect, useRef } from "react";
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from "./schema";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { toggleBold } from "./commands/toggleBold";
import { toggleItalic } from "./commands/toggleItalic";

export const MyEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({
          'Mod-b': (state, dispatch) => {
            toggleBold(state, dispatch);
            return true;
          },
          'Mod-i': (state, dispatch) => {
            toggleItalic(state, dispatch);
            return true;
          },
        })
      ]
    });

    const view = new EditorView(editorRef.current, {
      state,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    }

  }, []);

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button type="button" id="bold" onClick={() => {
          const view = viewRef.current;
          
          if (!view) return;

          toggleBold(view.state, view.dispatch);
          view.focus();
        }}>B</button>
        <button type="button" id="italic" onClick={() => {
          const view = viewRef.current;
          if (!view) return;

          toggleItalic(view.state, view.dispatch);
          view.focus();
        }}>I</button>
        <button type="button" id="underline">U</button>
        <button type="button" id="strike">S</button>
        <button type="button" id="link">L</button>
        <button type="button" id="image">Image</button>
        <button type="button" id="file">File</button>
        <button type="button" id="ul">UL</button>
        <button type="button" id="ol">OL</button>
        <button type="button" id="align-left">Align Left</button>
        <button type="button" id="align-center">Align Center</button>
        <button type="button" id="align-right">Align Right</button>
        <button type="button" id="undo">Undo</button>
        <button type="button" id="redo">Redo</button>
        <button type="button" id="clear">Clear</button>
      </div>
      <div className="editor-content" ref={editorRef} />
    </div>
  );
};
