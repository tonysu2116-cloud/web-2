import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";

interface Props {
  fieldRef: RefObject<FieldApi>;
}

interface Params {
  pace: number; // 0 (easy) -> 100 (race pace)
  heartRate: number; // bpm
  cadence: number; // steps/min
  power: number; // watts
  recovery: number; // 0 -> 100
}

const DEFAULTS: Params = { pace: 45, heartRate: 142, cadence: 172, power: 240, recovery: 70 };

const SLIDERS: { key: keyof Params; label: string; min: number; max: number; suffix: string }[] = [
  { key: "pace", label: "Pace", min: 0, max: 100, suffix: "%" },
  { key: "heartRate", label: "Heart rate", min: 100, max: 190, suffix: " bpm" },
  { key: "cadence", label: "Cadence", min: 150, max: 195, suffix: " spm" },
  { key: "power", label: "Power", min: 120, max: 380, suffix: "w" },
  { key: "recovery", label: "Recovery", min: 0, max: 100, suffix: "%" },
];

export default function LivePerformance({ fieldRef }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.live, 0.3);
  const [params, setParams] = useState<Params>(DEFAULTS);
  const paramsRef = useRef(params);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    paramsRef.current = params;
    const paceT = params.pace / 100;
    const fatigue = (100 - params.recovery) / 100;
    fieldRef.current?.setState({
      speed: 0.3 + paceT * 1.6,
      chaos: 0.08 + fatigue * 0.55,
      colorMix: 0.2 + (params.power - 120) / 260 * 0.5,
      organize: 0.7 - fatigue * 0.35,
    });
  }, [params, fieldRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let phase = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      const { pace, heartRate, power, recovery } = paramsRef.current;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const freq = 0.012 + ((heartRate - 100) / 90) * 0.045;
      const amp = h * 0.16 * (0.35 + power / 380);
      const speed = 0.03 + (pace / 100) * 0.09;
      const jitter = (100 - recovery) / 100;
      phase += speed * 16;

      ctx.beginPath();
      ctx.strokeStyle = "#c8ff33";
      ctx.lineWidth = 1.6 * (window.devicePixelRatio || 1);
      ctx.shadowColor = "#c8ff33";
      ctx.shadowBlur = 8;
      for (let x = 0; x <= w; x += 4) {
        const noise = jitter * amp * 0.5 * (Math.random() - 0.5);
        const y = h / 2 + Math.sin(x * freq + phase) * amp + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="live" ref={sectionRef} className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mb-14">
        <span className="font-display text-[11px] tx-tracking text-tx-muted">
          05 / SEE YOUR PERFORMANCE MOVE
        </span>
        <h2 className="font-display mt-3 max-w-2xl text-4xl font-medium leading-tight text-tx-fg sm:text-5xl">
          Move a variable. Watch the field respond.
        </h2>
        <p className="mt-4 max-w-lg text-sm text-tx-muted sm:text-base">
          This is a simulated session. Increase pace and the trajectory
          accelerates. Drop recovery and the field becomes unstable.
        </p>
      </div>

      <div className="border tx-hairline">
        <canvas ref={canvasRef} className="h-48 w-full sm:h-64" aria-hidden="true" />
        <div
          data-no-field-drag
          className="grid grid-cols-1 gap-8 border-t tx-hairline p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-5"
        >
          {SLIDERS.map((s) => (
            <label key={s.key} className="flex flex-col gap-3">
              <span className="flex items-baseline justify-between font-display text-[11px] tx-tracking uppercase text-tx-muted">
                <span>{s.label}</span>
                <span className="tx-accent-text">
                  {Math.round(params[s.key])}
                  {s.suffix}
                </span>
              </span>
              <input
                type="range"
                className="tx-range"
                min={s.min}
                max={s.max}
                value={params[s.key]}
                onChange={(e) =>
                  setParams((p) => ({ ...p, [s.key]: Number(e.target.value) }))
                }
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
