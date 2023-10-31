import { useState, useEffect } from "react";

export const useLocalStorage = (initialState, key) => {
  const [value, setValue] = useState(() => {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
