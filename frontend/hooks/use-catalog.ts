"use client";
import { useEffect, useState } from "react";
/** Curated content renders immediately; a reachable API becomes the source of truth. */
export function useCatalog<T>(load: () => Promise<T[]>, fallback: T[]) {
  const [items, setItems] = useState(fallback);
  useEffect(() => {
    let active = true;
    load()
      .then((data) => {
        if (active && data.length) setItems(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [load]);
  return items;
}
