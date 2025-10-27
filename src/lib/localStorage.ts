// Safe localStorage helpers with SSR and private mode fallbacks

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [k: string]: JSONValue };

const memoryStore = new Map<string, string>();

function canUseLocalStorage(): boolean {
  if (typeof window === "undefined" || !("localStorage" in window))
    return false;
  try {
    const testKey = "__ls_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const supported = canUseLocalStorage();

export function lsIsSupported(): boolean {
  return supported;
}

export function lsGet(key: string): string | null {
  try {
    return supported
      ? window.localStorage.getItem(key)
      : memoryStore.get(key) ?? null;
  } catch {
    return null;
  }
}

export function lsSet(key: string, value: string): boolean {
  try {
    if (supported) window.localStorage.setItem(key, value);
    else memoryStore.set(key, value);
    return true;
  } catch {
    return false;
  }
}

export function lsRemove(key: string): boolean {
  try {
    if (supported) window.localStorage.removeItem(key);
    else memoryStore.delete(key);
    return true;
  } catch {
    return false;
  }
}

export function lsKeys(): string[] {
  try {
    if (supported) {
      const out: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k) out.push(k);
      }
      return out;
    }
    return Array.from(memoryStore.keys());
  } catch {
    return [];
  }
}

export function lsGetJSON<T = unknown>(
  key: string,
  fallback: T | null = null
): T | null {
  const raw = lsGet(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function lsSetJSON<T extends JSONValue>(key: string, value: T): boolean {
  try {
    return lsSet(key, JSON.stringify(value));
  } catch {
    return false;
  }
}

export function lsClear(): boolean {
  try {
    if (supported) window.localStorage.clear();
    else memoryStore.clear();
    return true;
  } catch {
    return false;
  }
}

export type { JSONValue };
