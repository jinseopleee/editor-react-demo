import { type PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import type { Extension } from "../extensions/types";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import { EditorViewContext } from "../context/EditorViewContext";
import { EditorStateContext } from "../context/EditorStateContext";
import { EditorSchemaContext } from "../context/EditorSchemaContext";
import { bold } from "../extensions/extension-bold/bold";
import { EditorToolbar } from "./EditorToolbar";
import { EditorContext } from "../context/EditorContext";

type EditorRootProps = {
  extensions?: Extension[];
  onChange?: (value: string) => void;
  value?: string;
}

export const EditorRoot = ({ children, extensions = [bold], onChange, value }: PropsWithChildren<EditorRootProps>) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const schema = useMemo(() => {
    const marks = extensions?.map((e) => e.marks || {}).reduce((acc, m) => ({ ...acc, ...m }), {});
    const nodes = extensions?.map((e) => e.nodes || {}).reduce((acc, n) => ({ ...acc, ...n }), {});
    
    return new Schema({
      nodes: {
        doc: { content: "block+" },
        paragraph: { 
          content: "text*",
          group: "block",
          parseDOM: [{ tag: 'p' }],
          toDOM() { return ['p', { class: 'paragraph' }, 0] }
        },
        text: {},
        ...nodes,
      },
      marks,
    })
  }, [extensions]);
  const plugins = useMemo(() => {
    return extensions?.flatMap((e) => e.plugins || []) ?? [];
  }, [extensions]);

  // const schema = useMemo(() => {
  //   const marks = Object.assign({}, ...extensions.map(e => e.marks || {}));
  //   const nodes = Object.assign({},
  //     {
  //       doc: { content: 'block+' },
  //       paragraph: {
  //         content: 'text*',
  //         group: 'block',
  //         parseDOM: [{ tag: 'p' }],
  //         toDOM: () => ['p', 0],
  //       },
  //       text: {},
  //     },
  //     ...extensions.map(e => e.nodes || {})
  //   );
  //   return new Schema({ nodes, marks });
  // }, [extensions]);

  // const plugins: Plugin[] = useMemo(() => extensions.flatMap(e => e.plugins || []), [extensions]);

  const state = useMemo(() => EditorState.create({ schema, plugins }), [schema, plugins]);

  // const state = useMemo(() => EditorState.create({ schema, plugins }), [schema, plugins]);
  // const view = useMemo(() => new EditorView(editorRef.current, { state }), [state]);

  // const [state, setState] = useState<EditorState | null>(null);
  // const [view, setView] = useState<EditorView | null>(null);

  // useEffect(() => {
  //   if (!editorRef.current) return;
  //   const state = EditorState.create({ schema, plugins });
  //   const view = new EditorView(editorRef.current, { state });

  //   setState(state);
  //   setView(view);

  //   return () => {
  //     view.destroy();
  //   }
  // }, [schema, plugins]);

  const commands = useMemo(() => {
    const result: Record<string, Record<string, () => void>> = {};
    extensions?.forEach((ext) => {
      if (!ext.commands) return;

      result[ext.id] = {};
      for (const [cmd, fn] of Object.entries(ext.commands)) {
        result[ext.id][cmd] = () => viewRef.current && fn(viewRef.current);
      }
    });
    return result;
  }, [extensions])

  return (
    <EditorContext.Provider value={{ ref: editorRef, viewRef: viewRef, schema, state, commands, onChange }}>
      {children}
    </EditorContext.Provider>
    // <EditorSchemaContext.Provider value={schema}>
    //   <EditorViewContext.Provider value={view}>
    //     <EditorStateContext.Provider value={state}>
    //       {/* {children} */}
    //       <div id="good-editor-content" ref={editorRef} />
    //       <EditorToolbar />
    //   </EditorContext.Provider>
    //     </EditorStateContext.Provider>
    //   </EditorViewContext.Provider>
    // </EditorSchemaContext.Provider>
  )
}