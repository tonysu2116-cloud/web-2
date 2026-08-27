import type { RefObject } from "react";
import { motion } from "framer-motion";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  fieldRef: RefObject<FieldApi>;
  onStart: () => void;
}

export default function FinalCTA({ fieldRef, onStart }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.finalCta, 0.5);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-28 text-center sm:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-display max-w-3xl text-[11vw] font-medium uppercase leading-[0.95] text-tx-fg sm:text-7xl"
      >
        What are you capable of?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 font-display text-lg text-tx-accent"
      >
        Let&rsquo;s find out.
      </motion.p>

      <motion.button
        type="button"
        data-cursor="explore"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
        onClick={() => {
          playClick();
          onStart();
        }}
        className="group relative mt-14 overflow-hidden border border-tx-fg/30 px-12 py-4 font-display text-xs tx-tracking uppercase text-tx-fg transition-colors hover:border-tx-accent"
      >
        <span className="relative z-10 transition-colors group-hover:text-tx-bg">
          Start with TempoX
        </span>
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-tx-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
      </motion.button>
    </section>
  );
}
