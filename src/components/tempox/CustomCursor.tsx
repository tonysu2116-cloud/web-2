import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small ring that expands over interactive elements and
 * shows a contextual label (DRAG / ROTATE / EXPLORE) when hovering
 * something tagged with data-cursor. Disabled on touch/coarse pointers.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isFine = window.matchMedia?.("(pointer: fine)").matches;
    if (!isFine) return;

    document.body.classList.add("tx-cursor-active");
    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      const cursorTarget = el?.closest("[data-cursor]") as HTMLElement | null;
      const interactive = el?.closest(
        "a, button, [role='button'], input, [data-cursor]",
      );
      dot.classList.toggle("tx-cursor-hover", !!interactive);
      const state = cursorTarget?.dataset.cursor ?? "";
      if (labelRef.current) {
        labelRef.current.textContent = state ? state.toUpperCase() : "";
      }
    };
    const down = () => dot.classList.add("tx-cursor-down");
    const up = () => dot.classList.remove("tx-cursor-down");

    const render = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("tx-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={dotRef} className="tx-cursor" aria-hidden="true">
      <span className="tx-cursor-ring" />
      <span ref={labelRef} className="tx-cursor-label" />
    </div>
  );
}
