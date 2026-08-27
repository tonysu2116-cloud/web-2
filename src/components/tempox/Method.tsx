import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { methodStages } from "@/lib/tempox/data";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import type { FieldApi } from "@/components/tempox/PerformanceField";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

const STAGE_PRESETS = [
  fieldPresets.methodMeasure,
  fieldPresets.methodAnalyze,
  fieldPresets.methodAdapt,
  fieldPresets.methodRecover,
  fieldPresets.methodPerform,
];

export default function Method({ fieldRef }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const index = Math.min(
        methodStages.length - 1,
        Math.floor(progress * methodStages.length),
      );
      setActive(index);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fieldRef.current?.setState(STAGE_PRESETS[active]);
  }, [active, fieldRef]);

  const stage = methodStages[active];

  return (
    <section id="method" ref={wrapperRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 py-28 sm:px-10 sm:py-36">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          04 / THE TEMPOX METHOD
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={stage.index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="font-display text-sm tx-tracking text-tx-accent">
              {stage.index}
            </span>
            <h3 className="font-display mt-3 text-[13vw] font-medium uppercase leading-[0.9] text-tx-fg sm:text-8xl">
              {stage.title}
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-tx-muted">
              {stage.copy}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          {methodStages.map((s, i) => (
            <div key={s.index} className="h-px flex-1 bg-tx-line">
              <div
                className="h-px bg-tx-accent transition-all duration-500"
                style={{ width: i <= active ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
