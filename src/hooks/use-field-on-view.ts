import { useEffect, useRef, type RefObject } from "react";
import type { FieldApi, FieldTargets } from "@/components/tempox/PerformanceField";

/**
 * Attaches an IntersectionObserver to the returned ref; whenever that
 * element scrolls into view, it pushes `preset` onto the shared TempoX
 * Field so the background visual evolves with whatever content is on
 * screen.
 */
export function useFieldOnView<T extends HTMLElement = HTMLDivElement>(
  fieldRef: RefObject<FieldApi>,
  preset: FieldTargets,
  threshold = 0.45,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fieldRef.current?.setState(preset);
          }
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // preset is passed as a stable object literal from a lookup table by
    // callers; re-running on every render is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldRef]);

  return ref;
}
