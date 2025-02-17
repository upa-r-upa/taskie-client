import { useEffect, useRef } from "react";

interface Props {
  callback: () => void;

  enabled?: boolean;
}

export default function useIntersectionObserver({ callback, enabled }: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!triggerRef.current || !enabled) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 0.5 }
    );

    observer.current.observe(triggerRef.current);

    return () => observer.current?.disconnect();
  }, [enabled, callback]);

  return { triggerRef };
}
