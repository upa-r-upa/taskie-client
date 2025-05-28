import { useCallback, useRef } from "react";

export default function useFocusToEnd() {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const focusToEnd = useCallback(() => {
    if (!inputRef.current) return;

    const { current } = inputRef;
    current.focus();
    current.setSelectionRange(current.value.length, current.value.length);
  }, []);

  return { inputRef, focusToEnd };
}
