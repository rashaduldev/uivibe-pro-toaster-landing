"use client";

import { useEffect, useState } from "react";
import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";

const VARS = [
  "--uvt-bg", "--uvt-text", "--uvt-muted", "--uvt-border",
  "--uvt-shadow", "--uvt-radius", "--uvt-padding",
  "--uvt-success", "--uvt-error", "--uvt-info", "--uvt-warning", "--uvt-accent",
  "--uvt-gap", "--uvt-z-index", "--uvt-font",
];

export function ThemingShowcase() {
  const [accent, setAccent] = useState("#6366f1");
  const [radius, setRadius] = useState(12);

  useEffect(() => {
    document.documentElement.style.setProperty("--uvt-accent", accent);
    document.documentElement.style.setProperty("--uvt-radius", `${radius}px`);
  }, [accent, radius]);

  return (
    <section id="themes" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">13 · Theming</span>
          <h2 className="h-section-title">Override one CSS variable. Or all fifteen.</h2>
          <p className="h-section-sub">
            Every visual surface is wired to a CSS custom property. Drop them into
            <code className="code text-blue-300">{` :root`}</code> and they cascade everywhere.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <CodeBlock code={SNIPPETS.theming} lang="css" filename="app/globals.css" />

          <div className="card">
            <h3 className="text-lg font-semibold">Live tweak</h3>
            <div className="mt-4 grid gap-4">
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Accent color</span>
                <div className="mt-2 flex items-center gap-3">
                  <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="h-9 w-12 cursor-pointer rounded-md border border-white/10 bg-transparent [.theme-light_&]:border-ink-200" />
                  <code className="code text-white/80 [.theme-light_&]:text-ink-700">{accent}</code>
                </div>
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Border radius</span>
                <div className="mt-2 flex items-center gap-3">
                  <input type="range" min={0} max={28} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-blue-500" />
                  <code className="code text-white/80 [.theme-light_&]:text-ink-700">{radius}px</code>
                </div>
              </label>
              <button onClick={() => toast.success("Themed toast!", { description: "Look at that accent." })} className="btn-primary mt-2">
                Fire themed toast
              </button>
            </div>
            <div className="mt-6">
              <div className="mb-2 text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Available variables</div>
              <div className="flex flex-wrap gap-1.5">
                {VARS.map((v) => (
                  <code key={v} className="code rounded bg-white/5 px-2 py-0.5 text-[12px] text-white/70 [.theme-light_&]:bg-ink-100 [.theme-light_&]:text-ink-700">{v}</code>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
