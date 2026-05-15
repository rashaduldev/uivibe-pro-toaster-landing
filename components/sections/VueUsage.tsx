"use client";

import { toast } from "uivibe-pro-toaster";
import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";

export function VueUsage() {
  return (
    <section id="vue" className="section">
      <div className="container-x grid items-start gap-10 lg:grid-cols-2">
        <div>
          <span className="h-eyebrow">09 · Vue 3 / Nuxt</span>
          <h2 className="h-section-title">Composable. Reactive-friendly.</h2>
          <p className="h-section-sub">
            The same singleton works inside <code className="code text-indigo-300">setup()</code>,
            composables, or any client-side script. Configure once on <code className="code text-indigo-300">onMounted</code>
            {" "}and you&apos;re done.
          </p>
          <div className="mt-6 flex gap-2">
            <button onClick={() => toast.success("From Vue land", { position: "top-center" })} className="btn-primary">Vue-style toast</button>
          </div>
        </div>

        <CodeBlock code={SNIPPETS.vue} lang="vue" filename="App.vue" />
      </div>
    </section>
  );
}
