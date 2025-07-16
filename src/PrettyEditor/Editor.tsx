import { EditorState } from "prosemirror-state";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import type { ExtensionBaseOptions } from "./extension-builder/types";
import type { Plugin } from "prosemirror-state";

interface EditorOptions {
  extensions: ExtensionBaseOptions[];
}

export class Editor {

  private listeners = new Set<() => void>();

  public extensions: ExtensionBaseOptions[];

  public schema: Schema;

  private prevEditorState: EditorState | null = null;
  private editorState: EditorState;

  private editorView: EditorView | null = null;

  private pluginMap: Map<string, Plugin[]> = new Map();

  constructor(options: EditorOptions) {
    this.extensions = options.extensions;
    this.schema = this.createSchema();

    this.pluginMap = this.registerPlugin();
    this.editorState = this.createEditorState();
  }

  private createSchema(): Schema {
    const marks = this.extensions.map((e) => e.marks).reduce((acc, m) => ({ ...acc, ...m }), {});
    const nodes = this.extensions.map((e) => e.nodes).reduce((acc, n) => ({ ...acc, ...n }), {});
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

  private registerPlugin() {
    const plugins = new Map<string, Plugin[]>();
    this.extensions.map(e => plugins.set(e.name, e.plugins ?? []))
    return plugins;
  }

  private createEditorState(): EditorState {
    const plugins = Array.from(this.pluginMap.values()).flatMap(e => e);

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
    if (!this.editorView) {
      throw new Error('EditorView is not mounted');
    }

    return this.editorView;
  }

  public get prevState(): EditorState | null {
    return this.prevEditorState;
  }

  public mount(element: HTMLElement) {
    this.editorView = new EditorView(element, {
      state: this.editorState,
      dispatchTransaction: (tr) => {
        const newState = this.view.state.apply(tr);
        this.updateState(newState);
        this.view.updateState(newState);
      }
    }) 
  }

  public unmount() {
    this.view.destroy();
  }

  public subscribe = (cb: () => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    }
  }

  public updateState = (state: EditorState) => {
    this.prevEditorState = this.editorState;
    this.editorState = state;
    this.listeners.forEach((cb) => cb());
  }

  public existsPlugin(name: string): boolean {
    return Boolean(this.pluginMap.get(name));
  }
}
