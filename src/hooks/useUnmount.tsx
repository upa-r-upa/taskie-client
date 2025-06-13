import { useEffect, useRef } from "react";

export function useUnmount(effect: () => void) {
  const effectRef = useRef<() => void>(effect);
  effectRef.current = effect;

  useEffect(() => {
    return () => {
      effectRef.current();
    };
  }, []);
}
