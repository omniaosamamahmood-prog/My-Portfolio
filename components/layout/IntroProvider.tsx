"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { IntroLoader } from "@/components/layout/IntroLoader";

const STORAGE_KEY = "omnia-intro-seen";

type IntroContextValue = {
  /** True once the intro has finished (or was skipped). */
  introDone: boolean;
};

const IntroContext = createContext<IntroContextValue>({ introDone: true });

export function useIntro() {
  return useContext(IntroContext);
}

function shouldForceIntro() {
  const params = new URLSearchParams(window.location.search);
  return params.get("intro") === "1" || params.get("intro") === "true";
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** 'play' | 'skip' — decided on the client from session + query. */
function getIntroMode(): "play" | "skip" {
  if (shouldForceIntro()) return "play";
  if (hasSeenIntro()) return "skip";
  return "play";
}

function subscribeIntroMode() {
  return () => {};
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore(
    subscribeIntroMode,
    getIntroMode,
    () => "play",
  );
  const [finished, setFinished] = useState(false);

  const introDone = mode === "skip" || finished;
  const playIntro = mode === "play" && !finished;

  const handleComplete = useCallback(() => {
    try {
      if (!shouldForceIntro()) {
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      /* ignore quota / private mode */
    }
    setFinished(true);
  }, []);

  const value = useMemo(() => ({ introDone }), [introDone]);

  return (
    <IntroContext.Provider value={value}>
      {playIntro ? <IntroLoader onComplete={handleComplete} /> : null}
      <div className="relative z-10" {...(playIntro ? { inert: true } : {})}>
        {children}
      </div>
    </IntroContext.Provider>
  );
}
