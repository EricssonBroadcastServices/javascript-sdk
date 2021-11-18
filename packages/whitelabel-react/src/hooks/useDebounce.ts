import { useEffect, useState } from "react";

export function useDebounce<T = string>(value: T, delay: number): string | null {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);
  useEffect(() => {
    setDebouncedValue(null);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
