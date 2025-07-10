import { useEffect, useRef } from "react";
import { bold } from "./extensions/extension-bold/Bold";
import type { Extension } from "./extensions/types";
import { EditorState, Plugin } from "prosemirror-state";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";


const EditorToolbar = () => {
  const editor = useEditorState();

  // or
  // const bold = useBoldMark()
  // bold.toggle()
  // bold.isActive()
  // bold.canIUse()
  
  return (
    <div>
      <button 
        style={{
          backgroundColor: editor.isMarkActive('bold') ? 'black' : 'white',
        }}
        disabled={!editor.canUse('bold')}
        onClick={() => editor.toggleMark('bold')}
      >Bold</button>
    </div>
  )
}

type GoodEditorProps = {
  value?: string;
}

export const GoodEditor = ({ value }: GoodEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    element: editorRef,
    value,
    extensions: [
      bold
    ]
  });

  return (
    <div>
      <EditorToolbar />
      <div ref={editorRef} />
    </div>
  );
};

type EditorProps = {
  element: React.RefObject<HTMLDivElement | null>;
  value?: string;
  extensions: Extension[];
}

const useEditor = (props: EditorProps) => {
  const editorRef = useRef<EditorView>(null);

  useEffect(() => {
    

    const { element, extensions } = props;

    if (element) {
      return;
    }

    const schema = new Schema({
      nodes: {},
      marks: props.extensions.map((extension) => extension.marks).reduce((acc, mark) => {
        return { ...acc, ...mark }
      }, {}),
    })

    const state = EditorState.create({
      schema,
      plugins: extensions.map(extensions => extensions.plugins).flat().filter(Boolean) as Plugin[],
    });

    const view = new EditorView(element, {
      state,
    });

    editorRef.current = view;

    return () => {
      view.destroy();
    }
  }, []);

  return {
    editorRef
  }
}
