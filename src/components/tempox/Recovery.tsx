import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi, FieldTargets } from "@/components/tempox/PerformanceField";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

interface Inputs {
  sleep: number;
  hrv: number;
  trainingLoad: number;
  stress: number;
}

const DEFAULTS: Inputs = { sleep: 62, hrv: 58, trainingLoad: 70, stress: 55 };

const SLIDERS: { key: keyof Inputs; label: string; invert?: boolean }[] = [
  { key: "sleep", label: "Sleep quality" },
  { key: "hrv", label: "HRV" },
  { key: "trainingLoad", label: "Training load", invert: true },
  { key: "stress", label: "Stress", invert: true },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function blend(a: FieldTargets, b: FieldTargets, t: number): FieldTargets {
  return {
    organize: lerp(a.organize, b.organize, t),
    chaos: lerp(a.chaos, b.chaos, t),
    speed: lerp(a.speed, b.speed, t),
    colorMix: lerp(a.colorMix, b.colorMix, t),
    spread: lerp(a.spread, b.spread, t),
  };
}

export default function Recovery({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.recoveryChaotic, 0.3);
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const readiness = Math.round(
    (inputs.sleep + inputs.hrv + (100 - inputs.trainingLoad) + (100 - inputs.stress)) / 4,
  );

  useEffect(() => {
    const t = readiness / 100;
    fieldRef.current?.setState(
      blend(fieldPresets.recoveryChaotic, fieldPresets.recoveryCalm, t),
    );
  }, [readiness, fieldRef]);

  const label = readiness >= 70 ? "HIGH" : readiness >= 45 ? "MODERATE" : "LOW";

  return (
    <section id="recovery" ref={sectionRef} className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mb-16 max-w-2xl">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          06 / RECOVERY
        </span>
        <h2 className="font-display mt-3 text-4xl font-medium leading-tight text-tx-fg sm:text-5xl">
          Performance doesn&rsquo;t happen while you train.
        </h2>
        <p className="mt-3 font-display text-2xl text-tx-accent sm:text-3xl">
          It happens when you adapt.
        </p>
      </div>

      <div
        data-no-field-drag
        className="grid grid-cols-1 gap-14 border tx-hairline p-6 sm:p-10 lg:grid-cols-[1fr_auto]"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {SLIDERS.map((s) => (
            <label key={s.key} className="flex flex-col gap-3">
              <span className="flex items-baseline justify-between font-display text-[11px] tx-tracking uppercase text-tx-muted">
                <span>{s.label}</span>
                <span className="tx-accent-text">{inputs[s.key]}</span>
              </span>
              <input
                type="range"
                className="tx-range"
                min={0}
                max={100}
                value={inputs[s.key]}
                onChange={(e) =>
                  setInputs((p) => ({ ...p, [s.key]: Number(e.target.value) }))
                }
              />
            </label>
          ))}
        </div>

        <div className="flex flex-col justify-center border-t tx-hairline pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
          <span className="font-display text-[11px] tx-tracking text-tx-muted">
            READINESS
          </span>
          <span className="font-display mt-2 text-7xl text-tx-fg">{readiness}</span>
          <span className="font-display mt-2 text-xs tx-tracking text-tx-accent">
            {label}
          </span>
        </div>
      </div>
    </section>
  );
}
