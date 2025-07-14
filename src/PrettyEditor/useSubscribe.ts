// import { useRef } from "react";
// import type { Editor } from "./Editor";
// import { usePrettyEditorContext } from "./context";
import { deepEqual} from 'fast-equals';

// const useSubscribe = <T>(options: { selector: (state: Editor) => T; equalityFn?: (a: T, b: T) => boolean; }) => {
//   const { editor } = usePrettyEditorContext();
//   const { selector, equalityFn = deepEqual } = options;
//   const prevValueRef = useRef<T>(selector(editor));

//   const getSnapshot = () => {
//     const nextValue = selector();
//   }
// }
import { useSyncExternalStore } from 'react';

type Selector<TSnapshot, TValue> = (snapshot: TSnapshot) => TValue;
type EqualityFn<T> = (a: T, b: T) => boolean;

type UseSubscribeParams<TSnapshot, TValue> = {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => TSnapshot;
  selector: Selector<TSnapshot, TValue>;
  equalityFn?: EqualityFn<TValue>;
};

export function useSubscribe<TSnapshot, TValue>({
  subscribe,
  getSnapshot,
  selector,
  equalityFn = deepEqual,
}: UseSubscribeParams<TSnapshot, TValue>): TValue {
  const getSelectedSnapshot = () => {
    let lastValue = selector(getSnapshot());
    
    const next = selector(getSnapshot());
    if (!equalityFn(next, lastValue)) {
      lastValue = next;
    }
    return lastValue;
  };

  return useSyncExternalStore(subscribe, getSelectedSnapshot);
}
