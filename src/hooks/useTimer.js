import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(duration, onExpire) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const remainingRef = useRef(duration);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setTimeLeft(duration);
    remainingRef.current = duration;
  }, [duration, pause]);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        remainingRef.current = next;
        if (next <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setRunning(false);
          if (onExpire) onExpire();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, onExpire]);

  return { timeLeft, running, start, pause, reset };
}
