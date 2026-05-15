"use client";

import { toast } from "uivibe-pro-toaster";
import type { Position } from "uivibe-pro-toaster";

const POSITIONS: Position[] = [
  "top-left", "top-center", "top-right",
  "middle-left", "middle-center", "middle-right",
  "bottom-left", "bottom-center", "bottom-right",
];

const LABEL: Record<Position, string> = {
  "top-left": "Top Left",
  "top-center": "Top Center",
  "top-right": "Top Right",
  "middle-left": "Middle Left",
  "middle-center": "Middle Center",
  "middle-right": "Middle Right",
  "bottom-left": "Bottom Left",
  "bottom-center": "Bottom Center",
  "bottom-right": "Bottom Right",
};

export function PositionsGrid() {
  return (
    <section id="positions" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">14 · 9 positions</span>
          <h2 className="h-section-title">Pick any corner. Or every corner.</h2>
          <p className="h-section-sub">
            Each position has its own stack and queue, so toasts in different corners never fight
            for the same screen space.
          </p>
        </div>

        <div className="mt-10 mx-auto aspect-square w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-3 [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white">
          <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
            {POSITIONS.map((p) => (
              <button
                key={p}
                onClick={() => toast.info(`Hello from ${LABEL[p]}`, { position: p })}
                className="rounded-lg border border-white/10 bg-white/[0.03] text-xs text-white/70 transition hover:border-indigo-400 hover:bg-indigo-500/15 hover:text-white [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-ink-50 [.theme-light_&]:text-ink-600 [.theme-light_&]:hover:bg-indigo-100"
              >
                {LABEL[p]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={() => POSITIONS.forEach((p, i) => setTimeout(() => toast.success(LABEL[p], { position: p }), i * 120))} className="btn-primary">
            Fire all 9 at once
          </button>
        </div>
      </div>
    </section>
  );
}
