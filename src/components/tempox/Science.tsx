import type { RefObject } from "react";
import { motion } from "framer-motion";
import { scienceBlocks } from "@/lib/tempox/data";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

export default function Science({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.science, 0.3);

  return (
    <section id="science" ref={sectionRef} className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mb-14 max-w-2xl">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          07 / THE SCIENCE
        </span>
        <h2 className="font-display mt-3 text-4xl font-medium leading-tight text-tx-fg sm:text-5xl">
          Don&rsquo;t train harder. Train smarter.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-tx-muted sm:text-base">
          TempoX sits at the intersection of sport science, data, coaching
          and adaptation — five disciplines that only work when they inform
          each other.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden border tx-hairline bg-tx-line sm:grid-cols-2 lg:grid-cols-5">
        {scienceBlocks.map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group flex h-64 flex-col justify-between bg-tx-bg p-6 transition-colors hover:bg-tx-raised"
          >
            <span className="font-display text-[11px] tx-tracking text-tx-faint">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg uppercase text-tx-fg transition-colors group-hover:text-tx-accent">
                {block.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-tx-muted">
                {block.copy}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
