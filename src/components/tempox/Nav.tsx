import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  soundOn: boolean;
  onToggleSound: () => void;
  onStartTraining: () => void;
}

const LINKS: { label: string; href: string }[] = [
  { label: "Performance", href: "#explore" },
  { label: "Athletes", href: "#athletes" },
  { label: "Methodology", href: "#method" },
  { label: "Platform", href: "#live" },
  { label: "About", href: "#science" },
];

export default function Nav({ soundOn, onToggleSound, onStartTraining }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    playClick();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-colors duration-500 sm:px-10 ${
          scrolled ? "bg-tx-bg/70 backdrop-blur" : "bg-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          className="font-display text-sm tx-tracking text-tx-fg"
        >
          TEMPOX
        </a>

        <div className="hidden items-center gap-2 font-display text-[10px] tx-tracking text-tx-faint md:flex">
          <span>DRAG TO EXPLORE</span>
          <span className="mx-1 h-1 w-1 rounded-full bg-tx-faint" />
          <span>CLICK + HOLD</span>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            data-cursor="explore"
            onClick={() => {
              onToggleSound();
            }}
            className="font-display text-[10px] tx-tracking text-tx-muted transition-colors hover:text-tx-fg"
          >
            SOUND {soundOn ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            data-cursor="explore"
            onClick={() => setOpen(true)}
            className="font-display text-[11px] tx-tracking uppercase text-tx-fg"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-tx-bg px-6 py-6 sm:px-10 sm:py-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm tx-tracking text-tx-fg">
                TEMPOX
              </span>
              <button
                type="button"
                data-cursor="explore"
                onClick={() => setOpen(false)}
                className="font-display text-[11px] tx-tracking uppercase text-tx-muted hover:text-tx-fg"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  data-cursor="explore"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5 }}
                  onClick={() => go(link.href)}
                  className="group flex items-baseline gap-4 py-2 text-left"
                >
                  <span className="font-display text-xs text-tx-faint">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[12vw] uppercase leading-none text-tx-fg transition-colors group-hover:text-tx-accent sm:text-6xl">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="flex items-center justify-between font-display text-[11px] tx-tracking text-tx-muted">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onStartTraining();
                }}
                data-cursor="explore"
                className="uppercase text-tx-fg underline decoration-tx-accent decoration-2 underline-offset-4"
              >
                Start Training
              </button>
              <button
                type="button"
                onClick={onToggleSound}
                className="uppercase hover:text-tx-fg"
              >
                Sound {soundOn ? "On" : "Off"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
