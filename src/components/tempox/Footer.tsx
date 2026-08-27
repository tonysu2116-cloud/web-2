import type { RefObject } from "react";
import { fieldPresets } from "@/lib/tempox/fieldPresets";
import { useFieldOnView } from "@/hooks/use-field-on-view";
import type { FieldApi } from "@/components/tempox/PerformanceField";
import { playClick } from "@/lib/tempox/sound";

interface Props {
  fieldRef: RefObject<FieldApi>;
  onStartTraining: () => void;
}

const LINK_COLUMNS: { heading: string; links: string[] }[] = [
  { heading: "TempoX", links: ["Start Training", "Contact", "About TempoX"] },
  { heading: "Follow", links: ["Instagram", "Strava", "YouTube"] },
  { heading: "Legal", links: ["Privacy", "Terms"] },
];

export default function Footer({ fieldRef, onStartTraining }: Props) {
  const sectionRef = useFieldOnView<HTMLDivElement>(fieldRef, fieldPresets.footer, 0.4);

  return (
    <footer ref={sectionRef} className="relative border-t tx-hairline px-6 py-20 sm:px-10 sm:py-28">
      <h2 className="font-display max-w-xl text-4xl font-medium uppercase leading-tight text-tx-fg sm:text-5xl">
        Your next level starts here.
      </h2>

      <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-3">
        {LINK_COLUMNS.map((col) => (
          <div key={col.heading}>
            <span className="font-display text-[11px] tx-tracking text-tx-faint">
              {col.heading.toUpperCase()}
            </span>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  {link === "Start Training" ? (
                    <button
                      type="button"
                      data-cursor="explore"
                      onClick={() => {
                        playClick();
                        onStartTraining();
                      }}
                      className="font-display text-sm text-tx-muted transition-colors hover:text-tx-accent"
                    >
                      {link}
                    </button>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      data-cursor="explore"
                      className="font-display text-sm text-tx-muted transition-colors hover:text-tx-accent"
                    >
                      {link}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t tx-hairline pt-8 sm:flex-row sm:items-end">
        <span className="font-display text-[16vw] leading-none text-tx-fg/90 sm:text-8xl">
          TEMPOX
        </span>
        <span className="font-display text-[11px] tx-tracking text-tx-faint">
          © {new Date().getFullYear()} TEMPOX. PRECISION. PERFORMANCE. HUMAN POTENTIAL.
        </span>
      </div>
    </footer>
  );
}
