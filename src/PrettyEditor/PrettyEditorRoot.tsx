import { useMemo, type PropsWithChildren } from "react";
import { PrettyEditorContext } from "./context"
import type { Extension } from "../GoodEditor/extensions/types";
import { Editor } from "./Editor";

type PrettyEditorRootProps = PropsWithChildren<{
  extensions: Extension[];
}>

export const PrettyEditorRoot = ({ children, extensions }: PrettyEditorRootProps) => {
  // const editorRef = useRef<HTMLDivElement>(null);
  // const schema = useMemo(() => {
  //   const marks = extensions?.map((e) => e.marks || {}).reduce((acc, m) => ({ ...acc, ...m }), {});
  //   const nodes = extensions?.map((e) => e.nodes || {}).reduce((acc, n) => ({ ...acc, ...n }), {});
    
  //   return new Schema({
  //     nodes: {
  //       doc: { content: "block+" },
  //       paragraph: { 
  //         content: "text*",
  //         group: "block",
  //         parseDOM: [{ tag: 'p' }],
  //         toDOM() { return ['p', { class: 'paragraph' }, 0] }
  //       },
  //       text: {},
  //       ...nodes,
  //     },
  //     marks,
  //   })
  // }, [extensions]);
  // const plugins = useMemo(() => {
  //   return extensions?.flatMap((e) => e.plugins || []) ?? [];
  // }, [extensions]);
  // console.log(plugins);

  // const state = useMemo(() => EditorState.create({ schema, plugins: [
  //   keymap(baseKeymap),
  //   keymap({
  //     'Mod-b': (state: EditorState, dispatch?: (tr: Transaction) => void) => {
  //       console.log('toggleBold :: ', state, dispatch);
  //       toggleBold(state, dispatch);
  //       return true;
  //     }
  //   })
  // ] }), [schema]);
  // console.log('pretty editor plugin :: ', state.plugins);
  // // const view = useMemo(() => new EditorView(editorRef.current, { state }), [state]);

  // const [view, setView] = useState<EditorView | null>(null);

  // useEffect(() => {
  //   const view = new EditorView(null, { state });
  //   setView(view);
  //   return () => {
  //     view.destroy();
  //   }
  // }, [state])

  // if (!view) return null;

  const editor = useMemo(() => new Editor({ extensions }), [extensions]);

  return (
    <PrettyEditorContext.Provider value={{ editor }}>
      {children}
      {/* <div ref={editorRef} /> */}
    </PrettyEditorContext.Provider>
  )
}