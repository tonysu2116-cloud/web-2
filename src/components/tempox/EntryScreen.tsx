import { motion } from "framer-motion";

interface Props {
  onEnter: (withSound: boolean) => void;
}

const LETTERS = "TEMPOX".split("");

export default function EntryScreen({ onEnter }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-tx-bg/95 px-6 text-center">
      <span className="absolute left-6 top-6 font-display text-xs tx-tracking text-tx-faint sm:left-10 sm:top-10">
        TEMPOX
      </span>
      <span className="absolute right-6 top-6 hidden font-display text-[10px] tx-tracking text-tx-faint sm:right-10 sm:top-10 sm:block">
        PRECISION / PERFORMANCE / HUMAN POTENTIAL
      </span>

      <div className="flex overflow-hidden" aria-label="TempoX">
        {LETTERS.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "115%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              delay: 0.15 + i * 0.09,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display inline-block text-[15vw] font-medium leading-none tracking-tight text-tx-fg sm:text-[9vw]"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-7 max-w-sm font-display text-[11px] tx-tracking uppercase text-tx-muted sm:text-xs"
      >
        A performance intelligence platform for athletes who refuse to plateau.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.85, duration: 0.8 }}
        className="mt-14 flex flex-col items-center gap-6 sm:flex-row"
      >
        <button
          type="button"
          data-cursor="explore"
          onClick={() => onEnter(true)}
          className="group relative overflow-hidden border border-tx-fg/30 px-10 py-3 font-display text-xs tx-tracking uppercase text-tx-fg transition-colors hover:border-tx-accent"
        >
          <span className="relative z-10 transition-colors group-hover:text-tx-bg">
            Enter
          </span>
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-tx-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
        </button>
        <button
          type="button"
          onClick={() => onEnter(false)}
          className="font-display text-[11px] tx-tracking uppercase text-tx-muted transition-colors hover:text-tx-fg"
        >
          Enter without sound
        </button>
      </motion.div>
    </div>
  );
}
