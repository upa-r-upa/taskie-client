import { useCallback, useEffect, useRef } from "react";

export default function useDebounce(delayMillisecond: number) {
  const timerRef = useRef<number>();

  const clear = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
  }, []);

  const dispatch = useCallback(
    (callback: () => void) => {
      clear();
      timerRef.current = window.setTimeout(callback, delayMillisecond);
    },
    [delayMillisecond, clear]
  );

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return { dispatch, clear };
}
