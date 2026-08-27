import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";

/**
 * THE TEMPOX FIELD
 *
 * The signature visual of the site: a single, persistent particle field
 * that lives behind every section. It never resets between sections —
 * sections just push new targets at it (organize / chaos / speed /
 * colorMix / spread) and it eases toward them, exactly like an athlete's
 * state doesn't reset between training days.
 *
 *   organize  0 -> 1   scattered field -> structured orbit rings
 *   chaos     0 -> 1   calm -> fragmented / unstable
 *   speed     0 -> ~3  resting drift -> accelerated
 *   colorMix  0 -> 1   monochrome -> accent (electric lime)
 *   spread    0 -> 1   tight core -> expanded field
 */

export interface FieldTargets {
  organize: number;
  chaos: number;
  speed: number;
  colorMix: number;
  spread: number;
}

export const FIELD_REST: FieldTargets = {
  organize: 0.15,
  chaos: 0.12,
  speed: 0.3,
  colorMix: 0.08,
  spread: 0.45,
};

export interface FieldApi {
  setState: (target: Partial<FieldTargets>) => void;
}

interface Props {
  className?: string;
  opacity?: number;
}

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function makeGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

const PerformanceField = forwardRef<FieldApi, Props>(function PerformanceField(
  { className, opacity = 1 },
  ref,
) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<FieldTargets>({ ...FIELD_REST });

  useImperativeHandle(ref, () => ({
    setState: (partial) => {
      targetRef.current = { ...targetRef.current, ...partial };
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const count = reduceMotion ? 400 : isMobile ? 1100 : 2600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const base = new Float32Array(count * 3);
    const orbit = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const work = new Float32Array(count * 3);
    const colorAttr = new Float32Array(count * 3);

    const baseColor = new THREE.Color("#9a9a9a");
    const accentColor = new THREE.Color("#c8ff33");
    const tmpColor = new THREE.Color();

    const ringCounts = [0.35, 0.32, 0.33];
    for (let i = 0; i < count; i++) {
      // Random point inside a sphere for the "resting" field.
      const r = 3 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      base[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      base[i * 3 + 2] = r * Math.cos(phi) * 0.6;

      // Concentric orbit rings for the "organized" state — training load
      // as a set of orbits, per the brief.
      const roll = Math.random();
      let ringIndex = 0;
      let acc = 0;
      for (let k = 0; k < ringCounts.length; k++) {
        acc += ringCounts[k];
        if (roll <= acc) {
          ringIndex = k;
          break;
        }
      }
      const ringRadius = 2.2 + ringIndex * 1.6;
      const angle = Math.random() * Math.PI * 2;
      orbit[i * 3] = Math.cos(angle) * ringRadius;
      orbit[i * 3 + 1] = Math.sin(angle) * ringRadius * 0.35;
      orbit[i * 3 + 2] = Math.sin(angle * 2 + ringIndex) * 0.5;

      seeds[i] = Math.random() * 100;
      work[i * 3] = base[i * 3];
      work[i * 3 + 1] = base[i * 3 + 1];
      work[i * 3 + 2] = base[i * 3 + 2];
      colorAttr[i * 3] = baseColor.r;
      colorAttr[i * 3 + 1] = baseColor.g;
      colorAttr[i * 3 + 2] = baseColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(work, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colorAttr, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.065 : 0.05,
      map: makeGlowTexture(),
      transparent: true,
      opacity: 0.9,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const current: FieldTargets = { ...FIELD_REST };

    // Pointer interaction state.
    const mouse = { x: 0, y: 0 };
    const cameraTarget = { x: 0, y: 0 };
    const dragRotation = { x: 0, y: 0 };
    let pointerDown = false;
    let hasDragged = false;
    let lastPointer = { x: 0, y: 0 };
    let holdOverride: number | null = null;
    let holdTimer: number | null = null;

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      cameraTarget.x = mouse.x * 0.7;
      cameraTarget.y = -mouse.y * 0.45;

      if (pointerDown) {
        const dx = e.clientX - lastPointer.x;
        const dy = e.clientY - lastPointer.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) {
          hasDragged = true;
          if (holdTimer) {
            window.clearTimeout(holdTimer);
            holdTimer = null;
          }
          holdOverride = null;
          dragRotation.y += dx * 0.004;
          dragRotation.x = Math.max(
            -0.5,
            Math.min(0.5, dragRotation.x - dy * 0.003),
          );
        }
        lastPointer = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as HTMLElement;
      if (el?.closest?.("[data-no-field-drag]")) return;
      pointerDown = true;
      hasDragged = false;
      lastPointer = { x: e.clientX, y: e.clientY };
      holdTimer = window.setTimeout(() => {
        if (!hasDragged) {
          holdOverride = Math.max(targetRef.current.speed * 2.4, 1.6);
        }
      }, 160);
    };

    const endHold = () => {
      pointerDown = false;
      hasDragged = false;
      holdOverride = null;
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = null;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", endHold, { passive: true });
    window.addEventListener("pointercancel", endHold, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let time = 0;
    const clock = new THREE.Clock();
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);

      const effectiveSpeedTarget = holdOverride ?? targetRef.current.speed;
      const ease = reduceMotion ? 0.02 : 0.045;
      current.organize = lerp(current.organize, targetRef.current.organize, ease);
      current.chaos = lerp(current.chaos, targetRef.current.chaos, ease);
      current.speed = lerp(current.speed, effectiveSpeedTarget, ease);
      current.colorMix = lerp(current.colorMix, targetRef.current.colorMix, ease);
      current.spread = lerp(current.spread, targetRef.current.spread, ease);

      time += delta * (0.15 + current.speed * 0.35);

      const spreadScale = 0.55 + current.spread * 0.85;
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const col = geometry.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const seed = seeds[i];
        const bx = base[i * 3];
        const by = base[i * 3 + 1];
        const bz = base[i * 3 + 2];
        const ox = orbit[i * 3];
        const oy = orbit[i * 3 + 1];
        const oz = orbit[i * 3 + 2];

        let px = lerp(bx, ox, current.organize);
        let py = lerp(by, oy, current.organize);
        let pz = lerp(bz, oz, current.organize);

        px *= spreadScale;
        py *= spreadScale;
        pz *= spreadScale;

        const jitter = current.chaos * 1.1;
        px += Math.sin(time * 0.6 + seed * 12.9) * jitter;
        py += Math.cos(time * 0.5 + seed * 7.3) * jitter;
        pz += Math.sin(time * 0.35 + seed * 3.7) * jitter * 0.6;

        work[i * 3] = px;
        work[i * 3 + 1] = py;
        work[i * 3 + 2] = pz;

        tmpColor.copy(baseColor).lerp(accentColor, current.colorMix);
        const flicker = 0.82 + 0.35 * ((seed % 10) / 10);
        colorAttr[i * 3] = tmpColor.r * flicker;
        colorAttr[i * 3 + 1] = tmpColor.g * flicker;
        colorAttr[i * 3 + 2] = tmpColor.b * flicker;
      }
      pos.needsUpdate = true;
      col.needsUpdate = true;

      group.rotation.y = time * 0.06 + dragRotation.y;
      group.rotation.x = dragRotation.x;

      camera.position.x = lerp(camera.position.x, cameraTarget.x, 0.03);
      camera.position.y = lerp(camera.position.y, cameraTarget.y, 0.03);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", endHold);
      window.removeEventListener("pointercancel", endHold);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      material.map?.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ opacity, pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
});

export default PerformanceField;
