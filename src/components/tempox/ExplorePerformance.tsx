import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, spatialNodes, type CategoryId } from "@/lib/tempox/data";
import { categoryPreset, fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

const NODE_TARGETS: Record<string, string> = {
  train: "#live",
  recover: "#recovery",
  analyze: "#method",
  adapt: "#method",
  perform: "#athletes",
};

export default function ExplorePerformance({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.explore, 0.3);
  const [active, setActive] = useState<CategoryId>("all");
  const category = categories.find((c) => c.id === active) ?? categories[0];

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [minOffset, setMinOffset] = useState(0);
  const drag = useRef({ dragging: false, startX: 0, startOffset: 0, moved: false });

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      setMinOffset(Math.min(0, viewport.clientWidth - track.scrollWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const clamp = (v: number) => Math.max(minOffset, Math.min(0, v));

  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { dragging: true, startX: e.clientX, startOffset: offset, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current.dragging) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setOffset(clamp(drag.current.startOffset + dx));
  };
  const endDrag = () => {
    drag.current.dragging = false;
  };

  const selectCategory = (id: CategoryId) => {
    setActive(id);
    fieldRef.current?.setState(categoryPreset(id));
    playClick();
  };

  const goToNode = (id: string) => {
    if (drag.current.moved) return;
    playClick();
    document.querySelector(NODE_TARGETS[id] ?? "#method")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="explore" ref={sectionRef} className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mb-14 flex flex-col gap-3">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          02 / EXPLORE PERFORMANCE
        </span>
        <h2 className="font-display max-w-2xl text-4xl font-medium leading-tight text-tx-fg sm:text-5xl">
          Every discipline speaks a different data language.
        </h2>
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            data-cursor="explore"
            onClick={() => selectCategory(c.id)}
            className={`font-display border px-4 py-2 text-[11px] tx-tracking uppercase transition-colors ${
              active === c.id
                ? "border-tx-accent bg-tx-accent text-tx-bg"
                : "border-tx-line text-tx-muted hover:border-tx-fg/50 hover:text-tx-fg"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="mb-20 grid gap-6 border-y tx-hairline py-8 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <p className="max-w-xl text-sm leading-relaxed text-tx-muted sm:text-base">
            {category.blurb}
          </p>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {category.metrics.map((m) => (
              <span
                key={m}
                className="font-display border border-tx-line px-3 py-1 text-[10px] tx-tracking uppercase text-tx-fg"
              >
                {m}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Drag to explore */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          DRAG TO EXPLORE YOUR PERFORMANCE
        </span>
        <span className="font-display hidden text-[11px] tx-tracking text-tx-faint sm:block">
          ← →
        </span>
      </div>

      <div
        ref={viewportRef}
        data-no-field-drag
        data-cursor="drag"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="no-scrollbar overflow-hidden select-none"
      >
        <div
          ref={trackRef}
          style={{ transform: `translateX(${offset}px)` }}
          className="flex w-max gap-6 transition-transform duration-100 ease-out"
        >
          {spatialNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => goToNode(node.id)}
              className="group flex h-56 w-64 flex-shrink-0 flex-col justify-between border border-tx-line p-6 text-left transition-colors hover:border-tx-accent sm:h-64 sm:w-80"
            >
              <span className="font-display text-[11px] tx-tracking text-tx-faint">
                SPATIAL / {node.id.toUpperCase()}
              </span>
              <div>
                <h3 className="font-display text-3xl uppercase text-tx-fg transition-colors group-hover:text-tx-accent sm:text-4xl">
                  {node.label}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-tx-muted sm:text-sm">
                  {node.copy}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
