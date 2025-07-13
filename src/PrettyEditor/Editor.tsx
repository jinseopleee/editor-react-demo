import { EditorState } from "prosemirror-state";
import type { Extension } from "./extensions/types";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";

interface EditorOptions {
  extensions: Extension[];
}

export class Editor {

  public extensions: Extension[];

  public schema: Schema;

  private editorState: EditorState;

  private editorView!: EditorView;

  constructor(options: EditorOptions) {
    this.extensions = options.extensions;
    this.schema = this.createSchema();

    this.editorState = this.createEditorState();
  }

  private createSchema(): Schema {
    const marks = this.extensions?.map((e) => e.marks || {}).reduce((acc, m) => ({ ...acc, ...m }), {});
    const nodes = this.extensions?.map((e) => e.nodes || {}).reduce((acc, n) => ({ ...acc, ...n }), {});
    const schema = new Schema({
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

    return schema;
  }

  private createEditorState(): EditorState {
    const plugins = this.extensions?.flatMap((e) => e.plugins || []) ?? [];
    return EditorState.create({
      schema: this.schema,
      plugins: [
        keymap(baseKeymap),
        ...plugins,
      ]
    })
  }

  public get state(): EditorState {
    return this.editorState;
  }

  public get view(): EditorView {
    return this.editorView;
  }

  public mount(element: HTMLElement) {
    this.editorView = new EditorView(element, {
      state: this.editorState,
    }) 
  }

  public unmount() {
    this.editorView.destroy();
  }
}