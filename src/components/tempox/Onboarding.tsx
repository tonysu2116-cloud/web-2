import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  onboardingSports,
  onboardingGoals,
  onboardingLevels,
} from "@/lib/tempox/data";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import type { FieldApi } from "@/components/tempox/PerformanceField";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  open: boolean;
  onClose: () => void;
  fieldRef: RefObject<FieldApi>;
}

interface Answers {
  sport: string | null;
  goal: string | null;
  level: string | null;
}

const QUESTIONS = [
  { key: "sport" as const, prompt: "What do you do?", options: onboardingSports as readonly string[] },
  { key: "goal" as const, prompt: "What are you chasing?", options: onboardingGoals as readonly string[] },
  { key: "level" as const, prompt: "Where are you now?", options: onboardingLevels as readonly string[] },
];

export default function Onboarding({ open, onClose, fieldRef }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ sport: null, goal: null, level: null });

  useEffect(() => {
    if (!open) return;
    fieldRef.current?.setState(fieldPresets.onboarding);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, fieldRef]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers({ sport: null, goal: null, level: null });
    }
  }, [open]);

  const select = (key: keyof Answers, value: string) => {
    playClick();
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => setStep((s) => s + 1), 350);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col bg-tx-bg px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xs tx-tracking text-tx-fg">TEMPOX</span>
            <button
              type="button"
              data-cursor="explore"
              onClick={onClose}
              className="font-display text-[11px] tx-tracking uppercase text-tx-muted hover:text-tx-fg"
            >
              Close
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              {step < QUESTIONS.length ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-2xl text-center"
                >
                  <span className="font-display text-[11px] tx-tracking text-tx-muted">
                    QUESTION {step + 1} / {QUESTIONS.length}
                  </span>
                  <h2 className="font-display mt-4 text-4xl font-medium uppercase text-tx-fg sm:text-5xl">
                    {QUESTIONS[step].prompt}
                  </h2>
                  <div className="mt-12 flex flex-col items-center gap-1">
                    {QUESTIONS[step].options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        data-cursor="explore"
                        onClick={() => select(QUESTIONS[step].key, opt)}
                        className={`font-display w-full max-w-md py-3 text-2xl uppercase transition-colors hover:text-tx-accent sm:text-3xl ${
                          answers[QUESTIONS[step].key] === opt ? "text-tx-accent" : "text-tx-fg/80"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-xl text-center"
                >
                  <span className="font-display text-[11px] tx-tracking text-tx-accent">
                    YOUR PROFILE
                  </span>
                  <h2 className="font-display mt-4 text-3xl font-medium leading-snug text-tx-fg sm:text-4xl">
                    {answers.sport} · chasing {answers.goal?.toLowerCase()} ·{" "}
                    {answers.level?.toLowerCase()}
                  </h2>
                  <p className="mt-6 text-sm leading-relaxed text-tx-muted sm:text-base">
                    That&rsquo;s enough for TempoX to start building a plan
                    around the way you actually train — measured against
                    your own data, not a generic template.
                  </p>
                  <button
                    type="button"
                    data-cursor="explore"
                    onClick={onClose}
                    className="group relative mt-10 overflow-hidden border border-tx-fg/30 px-10 py-3 font-display text-xs tx-tracking uppercase text-tx-fg transition-colors hover:border-tx-accent"
                  >
                    <span className="relative z-10 transition-colors group-hover:text-tx-bg">
                      Back to TempoX
                    </span>
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-tx-accent transition-transform duration-300 ease-out group-hover:scale-y-100" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            {QUESTIONS.map((q, i) => (
              <div key={q.key} className="h-px flex-1 bg-tx-line">
                <div
                  className="h-px bg-tx-accent transition-all duration-500"
                  style={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
