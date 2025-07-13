import { useSyncExternalStore } from 'react';
import { Editor } from './Editor';

export function useSubscribe<T>(
  editor: Editor,
  getSnapshot: (editor: Editor) => T,
): T {
  return useSyncExternalStore(
    // subscribe
    (callback) => {
      if (!editor.view || !editor.view.dom) return () => {};

      const handler = () => {
        callback(); // snapshot이 바뀌었는지 확인 후 리렌더 유도
        return false;
      };

      const prev = editor.view.props.handleDOMEvents?.selectionchange;

      editor.view.setProps({
        ...editor.view.props,
        handleDOMEvents: {
          ...editor.view.props.handleDOMEvents,
          selectionchange: handler,
        },
      });

      return () => {
        editor.view.setProps({
          ...editor.view.props,
          handleDOMEvents: {
            ...editor.view.props.handleDOMEvents,
            selectionchange: prev,
          },
        });
      };
    },
    // getSnapshot
    () => getSnapshot(editor),
  );
}