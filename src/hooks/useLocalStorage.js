import { useCallback, useEffect, useRef, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const initializer = useRef(initialValue);

  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return initializer.current;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initializer.current;
    } catch (error) {
      console.warn("Failed to read localStorage", error);
      return initializer.current;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (state === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.warn("Failed to write localStorage", error);
    }
  }, [key, state]);

  const reset = useCallback(() => {
    setState(initializer.current);
  }, []);

  return [state, setState, reset];
}
