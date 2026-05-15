"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "uivibe-pro-toaster";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function useTheme(): ThemeCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTheme must be used inside Providers");
  return v;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("uvt-theme")) as Theme | null;
    const initial: Theme =
      saved ?? (window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "light") {
      root.classList.remove("dark");
      body.classList.add("theme-light");
    } else {
      root.classList.add("dark");
      body.classList.remove("theme-light");
    }
    try {
      localStorage.setItem("uvt-theme", theme);
    } catch {}
    toast.configure({ theme, position: "bottom-right", duration: 4000 });
  }, [theme]);

  const value = useMemo<ThemeCtx>(
    () => ({ theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")), setTheme }),
    [theme],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
