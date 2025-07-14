
import { deepEqual} from 'fast-equals';

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
