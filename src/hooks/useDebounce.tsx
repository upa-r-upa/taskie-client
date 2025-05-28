import { useCallback, useEffect, useRef } from "react";

export default function useDebounce(delayMillisecond: number) {
  const timerRef = useRef<number>();
  const callbackRef = useRef<() => void>();

  const clear = useCallback((runPending = false) => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      if (runPending && callbackRef.current) {
        callbackRef.current();
      }
    }
  }, []);

  const dispatch = useCallback(
    (callback: () => void) => {
      clear();
      callbackRef.current = callback;
      timerRef.current = window.setTimeout(() => {
        callback();
        callbackRef.current = undefined;
      }, delayMillisecond);
    },
    [delayMillisecond, clear]
  );

  useEffect(() => {
    return () => {
      clear(true);
    };
  }, [clear]);

  return { dispatch, clear };
}
