"use client";

import { toast } from "uivibe-pro-toaster";

export function Hero() {
  const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

  const demoSuccess = (): void => {
    toast.success("Listing saved!", { description: "Your changes are live." });
  };
  const demoError = (): void => {
    toast.error("Something broke", { description: "Try again in a moment." });
  };
  const demoPromise = (): void => {
    void toast.promise(
      wait(1800).then(() => (Math.random() > 0.3 ? { id: 42 } : Promise.reject(new Error("Network error")))),
      {
        loading: "Saving listing…",
        success: (data: { id: number }) => `Saved listing #${data.id}`,
        error: (err) => (err instanceof Error ? err.message : "Failed"),
      },
    );
  };

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText("npm install uivibe-pro-toaster");
      toast.success("Copied install command");
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <section id="top" className="section pt-32 md:pt-40">
      <div className="container-x relative isolate">
        <div className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-72 w-[60%] rounded-full bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-cyan-400/30 blur-3xl" />

        <div className="flex flex-col items-center text-center">
          <span className="h-eyebrow animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            v1.0 · under 5 kB gzipped
          </span>

          <h1 className="h-section-title max-w-4xl text-4xl md:text-6xl lg:text-7xl">
            Premium toasts in <span className="grad-text">&lt;5 kB</span>.<br className="hidden md:block" />
            <span className="text-white/90 [.theme-light_&]:text-ink-800">Anywhere you write JavaScript.</span>
          </h1>

          <p className="h-section-sub text-center">
            A zero-dependency, universal toast library. Vanilla, React, Vue, Next.js, PHP,
            Django — same API, three formats (ESM / CJS / CDN), glassmorphism out of the box.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={demoSuccess} className="btn-primary">Show success toast</button>
            <button onClick={demoError} className="pill-btn">Show error</button>
            <button onClick={demoPromise} className="pill-btn">Promise demo</button>
          </div>

          <button
            onClick={onCopy}
            className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-sm text-white/80 transition hover:bg-white/[0.08] [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white [.theme-light_&]:text-ink-700"
            aria-label="Copy install command"
          >
            <span className="text-white/40 [.theme-light_&]:text-ink-400">$</span>
            <span>npm install uivibe-pro-toaster</span>
            <span className="text-white/40 [.theme-light_&]:text-ink-400">↵</span>
          </button>
        </div>
      </div>
    </section>
  );
}
