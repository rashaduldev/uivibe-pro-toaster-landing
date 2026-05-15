"use client";

import { useState } from "react";
import { toast } from "uivibe-pro-toaster";

const FAQ = [
  {
    q: "How big is the bundle, really?",
    a: "Under 5 kB gzipped for every output (ESM, CJS, and IIFE/browser-global). No CSS file to import — styles are injected on first call.",
  },
  {
    q: "Do I need a <Toaster /> provider?",
    a: "No. The library uses a singleton manager that auto-mounts on the first toast call. Works the same in Vanilla JS, React, Vue, and any other DOM environment.",
  },
  {
    q: "Is it SSR-safe with Next.js App Router?",
    a: "Yes. Every browser API access is guarded by typeof window !== 'undefined'. Call toast() from any client component or event handler.",
  },
  {
    q: "Can I customize the look?",
    a: "Override any of the ~15 CSS variables (--uvt-bg, --uvt-radius, --uvt-accent, …) anywhere in your stylesheet, or pass className / style per toast.",
  },
  {
    q: "How does the queue work?",
    a: "Each position has its own visible-set and FIFO queue. When maxVisible is reached, new toasts wait. As old toasts dismiss, the queue promotes the next entry.",
  },
  {
    q: "Does swipe-to-dismiss work on mobile?",
    a: "Yes — it uses Pointer Events, which unify mouse and touch input. Drag past 80 px to dismiss; release earlier to snap back.",
  },
  {
    q: "Can I update a toast after it's shown?",
    a: "Yes — toast.update(id, { type, message, duration }) hot-swaps the content. This is exactly how toast.promise transitions loading → success.",
  },
  {
    q: "Is it tree-shakeable?",
    a: "Yes. The package is marked sideEffects: false and ships ESM. Bundlers will only include the methods you actually call.",
  },
];

export function FaqCta() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">16 · FAQ &amp; ship it</span>
          <h2 className="h-section-title">Common questions, then go ship.</h2>
          <p className="h-section-sub">
            Still wondering? Open an issue on GitHub — we read every one.
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 [.theme-light_&]:divide-ink-200 [.theme-light_&]:border-ink-200">
          {FAQ.map((it, i) => (
            <details
              key={it.q}
              open={open === i}
              onToggle={(e) => (e.currentTarget.open ? setOpen(i) : open === i && setOpen(null))}
              className="group px-5 py-4"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-white/90 marker:hidden [&::-webkit-details-marker]:hidden [.theme-light_&]:text-ink-800">
                <span>{it.q}</span>
                <span className="text-white/40 transition group-open:rotate-45 [.theme-light_&]:text-ink-400">+</span>
              </summary>
              <p className="mt-3 text-sm text-white/65 [.theme-light_&]:text-ink-600">{it.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-cyan-500/10 p-10 text-center [.theme-light_&]:border-ink-200 [.theme-light_&]:from-indigo-50 [.theme-light_&]:via-fuchsia-50 [.theme-light_&]:to-cyan-50">
          <h3 className="text-2xl font-semibold md:text-3xl">Ready to ship better feedback?</h3>
          <p className="mx-auto mt-3 max-w-xl text-white/70 [.theme-light_&]:text-ink-600">
            Install <code className="code text-indigo-300">uivibe-pro-toaster</code> and replace your existing
            toast library in under five minutes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => toast.success("Welcome to uivibe-pro-toaster 👋", { description: "Now go ship something." })} className="btn-primary">
              Try a toast
            </button>
            <a href="https://www.npmjs.com/package/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="pill-btn">View on npm</a>
            <a href="https://github.com/uivibe/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="pill-btn">Star on GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
