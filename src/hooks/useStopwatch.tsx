import { useState, useRef, useEffect, useCallback } from "react";

export default function useStopwatch(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // 현재 실행 중인 시간의 시작 시점을 기록 (밀리초)
  const startTimeRef = useRef<number | null>(null);
  // 이전에 누적된 시간(초)
  const accumulatedRef = useRef(initialSeconds);

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      setIsRunning(true);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current;
        accumulatedRef.current += Math.floor(elapsed / 1000);
      }
      setIsRunning(false);
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startTimeRef.current = null;
    }
  }, [isRunning]);

  const reset = useCallback(
    (newSeconds: number = 0) => {
      pause();
      accumulatedRef.current = newSeconds;
      setSeconds(newSeconds);
    },
    [pause]
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        if (startTimeRef.current !== null) {
          const elapsed = Date.now() - startTimeRef.current;
          setSeconds(accumulatedRef.current + Math.floor(elapsed / 1000));
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    setSeconds,
  };
}
