// Minimal, dependency-free sound design. No audio files — every sound is a
// short synthesized tone so the whole interface stays lightweight and the
// "sound" toggle has something honest and subtle to turn on.

let ctx: AudioContext | null = null;
let enabled = false;

interface WindowWithWebkitAudio extends Window {
  webkitAudioContext?: typeof AudioContext;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  if (value) getCtx();
}

export function isSoundEnabled() {
  return enabled;
}

function tone(freq: number, duration: number, type: OscillatorType, gainPeak: number, delay = 0) {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audio.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(gainPeak, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

export function playHover() {
  tone(880, 0.05, "sine", 0.02);
}

export function playClick() {
  tone(220, 0.09, "square", 0.03);
  tone(440, 0.07, "sine", 0.025, 0.01);
}

export function playEnter() {
  tone(120, 0.5, "sine", 0.05);
  tone(360, 0.4, "sine", 0.03, 0.05);
}

export function playPulse() {
  tone(140, 0.3, "sine", 0.02);
}
