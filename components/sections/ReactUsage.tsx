"use client";

import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { Tabs } from "@/components/Tabs";
import { SNIPPETS } from "@/lib/snippets";

export function ReactUsage() {
  return (
    <section id="react" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">08 · React &amp; Next.js</span>
          <h2 className="h-section-title">First-class React. SSR-safe by design.</h2>
          <p className="h-section-sub">
            In the App Router, call <code className="code text-indigo-300">toast</code> from
            any client component or event handler. No provider needed — the singleton manager
            handles mount, queue, and unmount for you.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="min-w-0">
            <Tabs
              tabs={[
                { label: "SaveButton.tsx", content: <CodeBlock code={SNIPPETS.react} lang="tsx" filename="app/components/SaveButton.tsx" /> },
                { label: "layout.tsx", content: <CodeBlock code={SNIPPETS.nextLayout} lang="tsx" filename="app/layout.tsx" /> },
              ]}
            />
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Try it inline</h3>
            <p className="mt-2 text-sm text-white/65 [.theme-light_&]:text-ink-600">
              This button is a normal React handler firing <code className="code text-indigo-300">toast.success</code>.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => toast.success("Saved from React!")} className="btn-primary">Save listing</button>
              <button onClick={() => toast.info("Re-rendered, no problem")} className="pill-btn">Info</button>
            </div>
            <p className="mt-4 text-xs text-white/50 [.theme-light_&]:text-ink-500">
              Works identically in Vite, Remix, Astro&apos;s React islands, and Solid (via @solidjs/start).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
