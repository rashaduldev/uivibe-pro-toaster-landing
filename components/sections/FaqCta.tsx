"use client";

import { useState } from "react";
import { toast } from "uivibe-pro-toaster";
import { FAQ } from "@/lib/faq";

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
            <a href="https://github.com/rashaduldev/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="pill-btn">Star on GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
