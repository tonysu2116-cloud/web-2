import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

// A single traced line that reads, in sequence, as a route, a heartbeat and
// a closing orbit — the abstract "performance visualization" called for in
// the brief, drawn with stroke-dashoffset rather than a generic spinner.
const PATH =
  "M 0 60 C 40 60 55 60 70 60 L 95 60 L 105 15 L 118 100 L 130 40 L 142 60 " +
  "C 170 60 200 60 220 60 " +
  "C 250 60 250 25 280 25 C 310 25 310 60 340 60 " +
  "C 360 60 365 60 375 60";

const PATH_LENGTH = 520;

export default function LoadingScreen({ onDone }: Props) {
  const [percent, setPercent] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const duration = 2400;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPercent(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        window.setTimeout(onDone, 320);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-tx-bg px-6">
      <span className="font-display mb-10 text-sm tx-tracking text-tx-fg">
        TEMPOX
      </span>

      <svg
        viewBox="0 0 375 120"
        className="w-full max-w-md"
        aria-hidden="true"
      >
        <path d={PATH} fill="none" stroke="hsl(var(--tx-line))" strokeWidth={1} />
        <motion.path
          d={PATH}
          fill="none"
          stroke="hsl(var(--tx-accent))"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          initial={{ strokeDashoffset: PATH_LENGTH }}
          animate={{ strokeDashoffset: PATH_LENGTH - (PATH_LENGTH * percent) / 100 }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </svg>

      <div className="mt-8 flex w-full max-w-md items-center justify-between font-display text-[11px] tx-tracking text-tx-faint">
        <span>LOADING PERFORMANCE FIELD</span>
        <span className="tx-accent-text">{percent.toString().padStart(2, "0")}%</span>
      </div>
    </div>
  );
}
