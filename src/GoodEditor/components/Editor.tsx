import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useEffect,
  useSyncExternalStore,
  type PropsWithChildren,
} from 'react';
import { Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { Extension } from '../extensions/types';
import { EditorContext } from '../context/EditorContext';
import { bold } from '../extensions/extension-bold/bold';

type EditorProps = PropsWithChildren<{
  extensions?: Extension[];
  value?: string;
  onChange?: (value: string) => void;
}>;

export const Editor = ({ extensions = [bold], value, onChange, children }: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  

  const schema = useMemo(() => {
    const marks = Object.assign({}, ...extensions.map(e => e.marks || {}));
    const nodes = Object.assign({
      doc: { content: 'block+' },
      paragraph: {
        content: 'text*',
        group: 'block',
        parseDOM: [{ tag: 'p' }],
        toDOM: () => ['p', 0],
      },
      text: {},
    }, ...extensions.map(e => e.nodes || {}));
    return new Schema({ nodes, marks });
  }, [extensions]);

  const plugins: Plugin[] = useMemo(() => extensions.flatMap(e => e.plugins || []), [extensions]);

  const stateRef = useRef<EditorState>(EditorState.create({ schema, plugins }));

  // const initialState = useMemo(() => EditorState.create({ schema, plugins }), [schema, plugins]);
  // stateRef.current = initialState;

  const commands = useMemo(() => {
    const result: Record<string, Record<string, () => void>> = {};
    extensions.forEach(ext => {
      if (!ext.commands) return;
      result[ext.id] = {};
      for (const [cmd, fn] of Object.entries(ext.commands)) {
        result[ext.id][cmd] = () => {
          const view = viewRef.current;
          if (view) fn(view);
        };
      }
    });
    return result;
  }, [extensions]);

  return (
    <EditorContext.Provider
      value={{ ref, viewRef, schema, stateRef, commands, onChange }}>
      {children}
    </EditorContext.Provider>
  );
};