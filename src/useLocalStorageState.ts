import { useEffect, useState } from "react";

const tryGetLocalStorageValue = (key: string) => {
  const item = localStorage?.getItem(key);
  try {
    return item != null ? JSON.parse(localStorage[key]) : null;
  } catch {
    return null;
  }
};

export default function useLocalStorageState<TState>(
  storageKey: string,
  defaultValue: TState
) {
  const [state, setState] = useState<TState>(
    tryGetLocalStorageValue(storageKey) ?? defaultValue
  );
  useEffect(() => {
    localStorage?.setItem(storageKey, JSON.stringify(state));
  }, [state]);
  return [state, setState] as const;
}
