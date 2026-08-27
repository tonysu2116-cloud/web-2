import { motion } from "framer-motion";
import type { RefObject } from "react";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import type { FieldApi } from "@/components/tempox/PerformanceField";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

export default function Hero({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.hero, 0.6);

  return (
    <section
      id="top"
      ref={sectionRef}
      data-cursor="rotate"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-14 pt-32 sm:px-10 sm:pb-20"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-[11px] tx-tracking text-tx-muted"
        >
          THE PERFORMANCE FIELD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display mt-6 max-w-4xl text-[11vw] font-medium leading-[0.95] tracking-tight text-tx-fg sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Reach the version of you that hasn&rsquo;t arrived yet.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-tx-muted sm:text-base"
        >
          TempoX combines training data, performance science, adaptive
          programming and intelligent feedback to help athletes train with
          greater precision.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4 font-display text-[11px] tx-tracking text-tx-faint">
          <span className="tx-accent-text">●</span>
          <span>MOVE YOUR CURSOR — THE FIELD REACTS</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-3 font-display text-[11px] tx-tracking text-tx-muted"
        >
          <span>SCROLL</span>
          <span className="h-8 w-px bg-tx-muted" />
        </motion.div>
      </div>
    </section>
  );
}
