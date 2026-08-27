import { useCallback, useEffect, useRef, useState } from "react";
import PerformanceField, { type FieldApi } from "@/components/tempox/PerformanceField";
import CustomCursor from "@/components/tempox/CustomCursor";
import EntryScreen from "@/components/tempox/EntryScreen";
import LoadingScreen from "@/components/tempox/LoadingScreen";
import Nav from "@/components/tempox/Nav";
import Hero from "@/components/tempox/Hero";
import ExplorePerformance from "@/components/tempox/ExplorePerformance";
import Athletes from "@/components/tempox/Athletes";
import Method from "@/components/tempox/Method";
import LivePerformance from "@/components/tempox/LivePerformance";
import Recovery from "@/components/tempox/Recovery";
import Science from "@/components/tempox/Science";
import FinalCTA from "@/components/tempox/FinalCTA";
import Onboarding from "@/components/tempox/Onboarding";
import Footer from "@/components/tempox/Footer";
import { setSoundEnabled, playEnter } from "@/lib/tempox/sound";

type Stage = "entry" | "loading" | "site";

const Index = () => {
  const [stage, setStage] = useState<Stage>("entry");
  const [soundOn, setSoundOn] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const fieldRef = useRef<FieldApi>(null);

  const handleEnter = useCallback((withSound: boolean) => {
    setSoundOn(withSound);
    setSoundEnabled(withSound);
    if (withSound) playEnter();
    setStage("loading");
  }, []);

  const handleLoaded = useCallback(() => setStage("site"), []);

  const toggleSound = useCallback(() => {
    setSoundOn((prev) => {
      const next = !prev;
      setSoundEnabled(next);
      return next;
    });
  }, []);

  const startTraining = useCallback(() => setOnboardingOpen(true), []);

  useEffect(() => {
    document.body.style.overflow = stage === "site" ? "" : "hidden";
  }, [stage]);

  return (
    <div className="min-h-screen bg-tx-bg text-tx-fg">
      <CustomCursor />
      <PerformanceField ref={fieldRef} className="fixed inset-0 z-0" opacity={0.85} />

      {stage === "entry" && <EntryScreen onEnter={handleEnter} />}
      {stage === "loading" && <LoadingScreen onDone={handleLoaded} />}

      <div className={`relative z-10 ${stage === "site" ? "" : "pointer-events-none opacity-0"}`}>
        <Nav soundOn={soundOn} onToggleSound={toggleSound} onStartTraining={startTraining} />
        <main>
          <Hero fieldRef={fieldRef} />
          <ExplorePerformance fieldRef={fieldRef} />
          <Athletes fieldRef={fieldRef} />
          <Method fieldRef={fieldRef} />
          <LivePerformance fieldRef={fieldRef} />
          <Recovery fieldRef={fieldRef} />
          <Science fieldRef={fieldRef} />
          <FinalCTA fieldRef={fieldRef} onStart={startTraining} />
        </main>
        <Footer fieldRef={fieldRef} onStartTraining={startTraining} />
      </div>

      <Onboarding open={onboardingOpen} onClose={() => setOnboardingOpen(false)} fieldRef={fieldRef} />
    </div>
  );
};

export default Index;
