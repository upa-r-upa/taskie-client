import { useState, useRef, useEffect, useCallback } from "react";

export default function useStopwatch(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const startTimeRef = useRef(0);
  const accumulatedRef = useRef(initialSeconds);
  const intervalRef = useRef<number>();

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const start = useCallback(() => {
    if (isRunning) return;
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }, [isRunning]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    accumulatedRef.current += elapsed;
    setSeconds(accumulatedRef.current);
    setIsRunning(false);
    clearTimer();
  }, [isRunning]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    accumulatedRef.current = initialSeconds;
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const setTime = useCallback(
    (newSeconds: number) => {
      accumulatedRef.current = newSeconds;
      setSeconds(newSeconds);
      if (isRunning) {
        startTimeRef.current = Date.now();
      }
    },
    [isRunning]
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setSeconds(accumulatedRef.current + elapsed);
      }, 100);
    }
    return clearTimer;
  }, [isRunning]);

  return { seconds, isRunning, start, pause, reset, setTime };
}
