import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { athletes, type Athlete, type AthleteMetric } from "@/lib/tempox/data";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

function MetricRow({ metric, active }: { metric: AthleteMetric; active: boolean }) {
  const [value, setValue] = useState(metric.from);

  useEffect(() => {
    if (!active) {
      setValue(metric.from);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(metric.from + (metric.to - metric.from) * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, metric]);

  const display = metric.format ? metric.format(value) : Math.round(value).toString();

  return (
    <div className="flex items-baseline justify-between border-b tx-hairline py-4">
      <span className="font-display text-xs tx-tracking uppercase text-tx-muted">
        {metric.label}
      </span>
      <span className="font-display text-3xl text-tx-fg sm:text-4xl">
        {display}
        {metric.suffix ?? ""}
      </span>
    </div>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="font-display text-[11px] tx-tracking text-tx-accent">
        {label.toUpperCase()}
      </span>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-tx-fg/90">{text}</p>
    </div>
  );
}

function CaseStudy({ athlete, onClose }: { athlete: Athlete; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-tx-bg"
    >
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
        <button
          type="button"
          data-cursor="explore"
          onClick={onClose}
          className="mb-16 block font-display text-[11px] tx-tracking uppercase text-tx-muted hover:text-tx-fg"
        >
          ← Close
        </button>

        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          ATHLETE / {athlete.index}
        </span>
        <h3 className="font-display mt-4 text-6xl uppercase leading-none text-tx-fg sm:text-8xl">
          {athlete.name}
        </h3>
        <p className="mt-3 text-sm text-tx-muted">{athlete.discipline}</p>

        <div className="mt-16 space-y-14">
          <CaseBlock label="The Objective" text={athlete.objective} />
          <CaseBlock label="The Data" text={athlete.data} />
          <CaseBlock label="The Intervention" text={athlete.intervention} />
          <CaseBlock label="The Adaptation" text={athlete.adaptation} />

          <div>
            <span className="font-display text-[11px] tx-tracking text-tx-accent">
              THE RESULT
            </span>
            <div className="mt-6">
              {athlete.metrics.map((m) => (
                <MetricRow key={m.label} metric={m} active />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Athletes({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.athletes, 0.3);
  const [openId, setOpenId] = useState<string | null>(null);
  const athlete = athletes.find((a) => a.id === openId) ?? null;

  return (
    <section id="athletes" ref={sectionRef} className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mb-14">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          03 / ATHLETES
        </span>
        <h2 className="font-display mt-3 max-w-2xl text-4xl font-medium leading-tight text-tx-fg sm:text-5xl">
          Five athletes. Five performance worlds.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border tx-hairline bg-tx-line sm:grid-cols-2 lg:grid-cols-5">
        {athletes.map((a) => (
          <button
            key={a.id}
            type="button"
            data-cursor="explore"
            onClick={() => {
              setOpenId(a.id);
              playClick();
            }}
            className="group relative flex h-72 flex-col justify-between bg-tx-bg p-6 text-left transition-colors hover:bg-tx-raised"
          >
            <span className="font-display text-[11px] tx-tracking text-tx-faint">
              ATHLETE / {a.index}
            </span>
            <div>
              <h3 className="font-display text-3xl uppercase text-tx-fg transition-colors group-hover:text-tx-accent">
                {a.name}
              </h3>
              <p className="mt-1 text-xs text-tx-muted">{a.discipline}</p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {athlete && <CaseStudy athlete={athlete} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  );
}
