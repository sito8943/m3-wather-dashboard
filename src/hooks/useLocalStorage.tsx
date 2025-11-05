import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  lsGetJSON,
  lsSetJSON,
  lsRemove,
  lsIsSupported,
  type JSONValue,
} from "../services/localStorage/functions";

type SetStateAction<T> = T | ((prev: T) => T);

export type UseLocalStorageOptions<T> = {
  listenCrossTab?: boolean;
  parse?: (raw: unknown) => T;
  serialize?: (val: T) => unknown;
};

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const { listenCrossTab = true, parse, serialize } = options;

  const parseRef = useRef(parse);
  const serializeRef = useRef(serialize);
  parseRef.current = parse;
  serializeRef.current = serialize;

  const readValue = () => {
    const stored = lsGetJSON<unknown>(key, undefined);
    if (!stored) return initialValue;
    try {
      return parseRef.current ? (parseRef.current(stored) as T) : (stored as T);
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    setValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!listenCrossTab || !lsIsSupported()) return;
    const handler = (e: StorageEvent) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== key) return;
      setValue(readValue());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, listenCrossTab]);

  const set = useCallback(
    (next: SetStateAction<T>) => {
      setValue((prev) => {
        const computed =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        const toStore = serializeRef.current
          ? serializeRef.current(computed)
          : computed;
        lsSetJSON(key, toStore as JSONValue);
        return computed;
      });
    },
    [key]
  );

  const remove = useCallback(() => {
    lsRemove(key);
    setValue(initialValue);
  }, [initialValue, key]);

  return useMemo(() => ({ value, set, remove }), [remove, set, value]);
}

export default useLocalStorage;
