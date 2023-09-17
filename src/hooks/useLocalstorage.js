import { useEffect, useState } from "react";

export function useLocalstorage(key) {
  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem(key))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageData));
  }, [key, localStorageData]);

  return [localStorageData, setLocalStorageData];
}
