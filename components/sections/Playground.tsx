"use client";

import { useMemo, useState } from "react";
import { toast } from "uivibe-pro-toaster";
import type { Position, ToastType } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";

const POSITIONS: Position[] = [
  "top-left", "top-center", "top-right",
  "middle-left", "middle-center", "middle-right",
  "bottom-left", "bottom-center", "bottom-right",
];

const TYPES: ToastType[] = ["default", "success", "error", "info", "warning", "loading"];

export function Playground() {
  const [position, setPosition] = useState<Position>("bottom-right");
  const [duration, setDuration] = useState<number>(4000);
  const [type, setType] = useState<ToastType>("success");
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [progress, setProgress] = useState(true);
  const [swipe, setSwipe] = useState(true);
  const [description, setDescription] = useState(false);

  const fire = (): void => {
    const messages: Record<ToastType, string> = {
      default: "A new event happened",
      success: "Listing saved!",
      error: "Something went wrong",
      info: "Heads up — new update available",
      warning: "Low on disk space",
      loading: "Working on it…",
    };
    const fn =
      type === "default" ? (toast as unknown as (m: string, o?: object) => string) : toast[type];
    fn(messages[type], {
      position,
      duration,
      pauseOnHover,
      progress,
      swipeToDismiss: swipe,
      description: description ? "More context about what happened." : undefined,
    });
  };

  const snippet = useMemo(() => {
    const method = type === "default" ? "" : `.${type}`;
    const msg = type === "default" ? "A new event happened" : "Listing saved!";
    const desc = description ? `\n    description: "More context about what happened.",` : "";
    return `toast${method}(
  "${msg}",
  {
    position: "${position}",
    duration: ${duration}, // ms
    pauseOnHover: ${pauseOnHover},
    progress: ${progress},
    swipeToDismiss: ${swipe},${desc}
  },
);`;
  }, [type, position, duration, pauseOnHover, progress, swipe, description]);

  return (
    <section id="playground" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">03 · Live playground</span>
          <h2 className="h-section-title">Tweak it, fire it, copy the snippet.</h2>
          <p className="h-section-sub">
            Every option you toggle here maps 1:1 to a real config key. Drop the generated
            snippet straight into your app.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card">
            <div className="mb-5">
              <div className="mb-2 text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Type</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`pill-btn capitalize ${
                      type === t ? "!border-indigo-400 !bg-indigo-500/20 text-white" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-2 text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Position</div>
              <div className="grid grid-cols-3 gap-2">
                {POSITIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPosition(p)}
                    className={`rounded-md border border-white/10 px-2 py-2 text-xs transition ${
                      position === p
                        ? "border-indigo-400 bg-indigo-500/20 text-white"
                        : "bg-white/[0.03] text-white/70 hover:bg-white/10 [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white [.theme-light_&]:text-ink-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">
                <span>Duration</span>
                <span className="font-mono normal-case text-white/80 [.theme-light_&]:text-ink-700">{duration === 0 ? "Sticky" : duration + " ms"}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000}
                step={500}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["Pause on hover", pauseOnHover, setPauseOnHover],
                ["Progress bar", progress, setProgress],
                ["Swipe to dismiss", swipe, setSwipe],
                ["Description line", description, setDescription],
              ].map(([label, value, set]) => (
                <label key={label as string} className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => (set as (b: boolean) => void)(e.target.checked)}
                    className="accent-indigo-500"
                  />
                  <span className="text-white/85 [.theme-light_&]:text-ink-700">{label as string}</span>
                </label>
              ))}
            </div>

            <button onClick={fire} className="btn-primary mt-6 w-full">Fire toast</button>
          </div>

          <CodeBlock code={snippet} lang="ts" filename="playground-output.ts" />
        </div>
      </div>
    </section>
  );
}
