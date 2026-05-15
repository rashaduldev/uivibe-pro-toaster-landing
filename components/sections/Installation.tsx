"use client";

import { CodeBlock } from "@/components/CodeBlock";
import { Tabs } from "@/components/Tabs";
import { SNIPPETS } from "@/lib/snippets";

export function Installation() {
  return (
    <section id="install" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">05 · Install in 5 seconds</span>
          <h2 className="h-section-title">Pick your package manager. Or skip it entirely.</h2>
          <p className="h-section-sub">
            Use npm/pnpm/yarn/bun, or load the UMD bundle straight from a CDN — same exports, same API.
          </p>
        </div>

        <div className="mt-10">
          <Tabs
            tabs={[
              { label: "npm", content: <CodeBlock code={SNIPPETS.install.npm} lang="bash" filename="terminal" /> },
              { label: "pnpm", content: <CodeBlock code={SNIPPETS.install.pnpm} lang="bash" filename="terminal" /> },
              { label: "yarn", content: <CodeBlock code={SNIPPETS.install.yarn} lang="bash" filename="terminal" /> },
              { label: "bun", content: <CodeBlock code={SNIPPETS.install.bun} lang="bash" filename="terminal" /> },
              { label: "unpkg", content: <CodeBlock code={SNIPPETS.install.cdnUnpkg} lang="html" filename="index.html" /> },
              { label: "jsDelivr", content: <CodeBlock code={SNIPPETS.install.cdnJsdelivr} lang="html" filename="index.html" /> },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
