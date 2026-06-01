import { useEffect, useRef } from 'react';

export function useDebounce(fn: () => void, delay: number, deps: any[]) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(fn, delay);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, deps);
}