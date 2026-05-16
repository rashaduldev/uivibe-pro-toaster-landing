"use client";

import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";

export function VanillaUsage() {
  return (
    <section id="vanilla" className="section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <span className="h-eyebrow">07 · Vanilla JS / HTML</span>
          <h2 className="h-section-title">No build step required.</h2>
          <p className="h-section-sub">
            Drop a single <code className="code text-blue-300">&lt;script&gt;</code> tag from
            unpkg or jsDelivr. The global <code className="code text-blue-300">window.Toast</code>
            {" "}is the same callable API you get from npm.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["success", "error", "info", "warning"] as const).map((t) => (
              <button
                key={t}
                onClick={() => toast[t](`${t[0].toUpperCase() + t.slice(1)} toast`)}
                className="pill-btn capitalize"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <CodeBlock code={SNIPPETS.vanilla} lang="html" filename="index.html" />
      </div>
    </section>
  );
}
