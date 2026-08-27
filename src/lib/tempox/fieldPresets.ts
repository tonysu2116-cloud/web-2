import type { FieldTargets } from "@/components/tempox/PerformanceField";

// Named states for THE TEMPOX FIELD. Sections push these in as the visitor
// scrolls, so the same particle field reads as calm, energetic, fragmented,
// stabilizing or fully organized depending on the content in view.
export const fieldPresets: Record<string, FieldTargets> = {
  rest: { organize: 0.15, chaos: 0.12, speed: 0.3, colorMix: 0.08, spread: 0.45 },
  hero: { organize: 0.3, chaos: 0.18, speed: 0.5, colorMix: 0.22, spread: 0.6 },
  explore: { organize: 0.45, chaos: 0.2, speed: 0.55, colorMix: 0.3, spread: 0.65 },

  categoryAll: { organize: 0.35, chaos: 0.22, speed: 0.5, colorMix: 0.25, spread: 0.65 },
  categoryRun: { organize: 0.55, chaos: 0.15, speed: 0.95, colorMix: 0.45, spread: 0.55 },
  categorySwim: { organize: 0.65, chaos: 0.35, speed: 0.4, colorMix: 0.35, spread: 0.5 },
  categoryBike: { organize: 0.7, chaos: 0.12, speed: 1.2, colorMix: 0.5, spread: 0.6 },
  categoryTriathlon: { organize: 0.5, chaos: 0.3, speed: 0.75, colorMix: 0.4, spread: 0.7 },
  categoryStrength: { organize: 0.8, chaos: 0.08, speed: 0.3, colorMix: 0.55, spread: 0.4 },
  categoryRecovery: { organize: 0.3, chaos: 0.06, speed: 0.15, colorMix: 0.15, spread: 0.35 },
  categoryMindset: { organize: 0.4, chaos: 0.1, speed: 0.25, colorMix: 0.2, spread: 0.5 },

  athletes: { organize: 0.4, chaos: 0.18, speed: 0.45, colorMix: 0.28, spread: 0.6 },
  live: { organize: 0.5, chaos: 0.2, speed: 0.5, colorMix: 0.32, spread: 0.55 },

  methodMeasure: { organize: 0.2, chaos: 0.25, speed: 0.35, colorMix: 0.15, spread: 0.55 },
  methodAnalyze: { organize: 0.55, chaos: 0.3, speed: 0.5, colorMix: 0.3, spread: 0.6 },
  methodAdapt: { organize: 0.45, chaos: 0.45, speed: 0.7, colorMix: 0.35, spread: 0.7 },
  methodRecover: { organize: 0.35, chaos: 0.08, speed: 0.2, colorMix: 0.18, spread: 0.4 },
  methodPerform: { organize: 0.9, chaos: 0.05, speed: 1.4, colorMix: 0.65, spread: 0.6 },

  recoveryChaotic: { organize: 0.1, chaos: 0.8, speed: 0.9, colorMix: 0.35, spread: 0.85 },
  recoveryCalm: { organize: 0.6, chaos: 0.04, speed: 0.12, colorMix: 0.12, spread: 0.35 },

  science: { organize: 0.5, chaos: 0.15, speed: 0.35, colorMix: 0.2, spread: 0.55 },

  finalCta: { organize: 0.95, chaos: 0.05, speed: 1.1, colorMix: 0.7, spread: 0.55 },
  onboarding: { organize: 0.6, chaos: 0.2, speed: 0.5, colorMix: 0.4, spread: 0.55 },
  footer: { organize: 0.2, chaos: 0.1, speed: 0.2, colorMix: 0.15, spread: 0.4 },
};

export function categoryPreset(id: string): FieldTargets {
  const key = `category${id.charAt(0).toUpperCase()}${id.slice(1)}`;
  return fieldPresets[key] ?? fieldPresets.categoryAll;
}
