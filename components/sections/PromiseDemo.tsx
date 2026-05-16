"use client";

import { useState } from "react";
import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";


export function PromiseDemo() {
  const [running, setRunning] = useState(false);

  const run = (outcome: "success" | "error"): void => {
    if (running) return;
    setRunning(true);
    void toast
      .promise(
        new Promise<{ id: number }>((resolve, reject) =>
          setTimeout(() => (outcome === "success" ? resolve({ id: 1024 }) : reject(new Error("Network timeout"))), 1800),
        ),
        {
          loading: "Saving listing…",
          success: (d) => `Saved listing #${d.id}`,
          error: (e) => (e instanceof Error ? e.message : "Failed"),
        },
        { duration: 4500 },
      )
      .catch(() => undefined)
      .finally(() => setRunning(false));
  };

  return (
    <section id="promise" className="section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <span className="h-eyebrow">10 · Promise pipeline</span>
          <h2 className="h-section-title">Loading. Success. Or error. One call.</h2>
          <p className="h-section-sub">
            Hand <code className="code text-blue-300">toast.promise</code> any promise and three messages.
            It shows a spinner while pending, then swaps to a success / error toast based on the outcome.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => run("success")} disabled={running} className="btn-primary disabled:opacity-60">
              Simulate success
            </button>
            <button onClick={() => run("error")} disabled={running} className="pill-btn disabled:opacity-60">
              Simulate failure
            </button>
          </div>
        </div>

        <CodeBlock code={SNIPPETS.promise} lang="ts" filename="lib/saveListing.ts" />
      </div>
    </section>
  );
}
