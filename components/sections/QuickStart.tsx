"use client";

import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";

export function QuickStart() {
  return (
    <section id="quickstart" className="section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <span className="h-eyebrow">06 · Quick start</span>
          <h2 className="h-section-title">Three lines. Done.</h2>
          <p className="h-section-sub">
            No mount step. No provider. No CSS import. The library injects its own styles on
            the first call and is fully SSR-safe — call it from any client code path.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/80 [.theme-light_&]:text-ink-700">
            <li>✓ No <code className="code text-blue-300">&lt;Toaster /&gt;</code> mount</li>
            <li>✓ No <code className="code text-blue-300">import "./styles.css"</code></li>
            <li>✓ No SSR pre-render mismatch — DOM is only touched in the browser</li>
            <li>✓ Singleton container survives client-side navigation</li>
          </ul>
          <div className="mt-6 flex gap-2">
            <button onClick={() => toast.success("Listing saved!")} className="btn-primary">Try it</button>
            <button onClick={() => toast.dismiss()} className="pill-btn">Dismiss all</button>
          </div>
        </div>

        <CodeBlock code={SNIPPETS.quickstart} lang="ts" filename="app/anywhere.ts" />
      </div>
    </section>
  );
}
