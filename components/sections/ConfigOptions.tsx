import { CodeBlock } from "@/components/CodeBlock";
import { SNIPPETS } from "@/lib/snippets";

const OPTIONS = [
  { name: "duration", type: "number | Infinity", def: "4000", notes: "ms before auto-dismiss. Infinity = sticky." },
  { name: "position", type: "Position", def: '"top-right"', notes: "One of 9 positions (top/middle/bottom × left/center/right)." },
  { name: "icon", type: "string | false", def: "auto", notes: "Custom SVG/HTML or false to hide." },
  { name: "description", type: "string", def: "—", notes: "Secondary line under the title." },
  { name: "action", type: "{ label, onClick }", def: "—", notes: "Inline action button (e.g. Undo)." },
  { name: "html", type: "string", def: "—", notes: "Raw custom HTML — bypasses default layout." },
  { name: "dismissible", type: "boolean", def: "true", notes: "Show / hide the close (×) button." },
  { name: "pauseOnHover", type: "boolean", def: "true", notes: "Pause timer + progress on hover/focus." },
  { name: "swipeToDismiss", type: "boolean", def: "true", notes: "Pointer-event drag to dismiss (mouse + touch)." },
  { name: "progress", type: "boolean", def: "true", notes: "Show the bottom countdown bar." },
  { name: "theme", type: '"light" | "dark" | "auto"', def: '"auto"', notes: "Reads prefers-color-scheme when auto." },
  { name: "className / style", type: "string / CSS", def: "—", notes: "DOM passthrough for one-off styling." },
  { name: "onShow / onDismiss / onClick", type: "(id) => void", def: "—", notes: "Lifecycle callbacks." },
];

export function ConfigOptions() {
  return (
    <section id="options" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">12 · Options</span>
          <h2 className="h-section-title">Configure once, override per toast.</h2>
          <p className="h-section-sub">
            <code className="code text-indigo-300">toast.configure()</code> sets defaults for every
            subsequent call. Per-toast options always win.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr]">
          <CodeBlock code={SNIPPETS.configure} lang="ts" filename="app/toast-defaults.ts" />

          <div className="overflow-x-auto rounded-2xl border border-white/10 [.theme-light_&]:border-ink-200">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-white/[0.04] text-left text-white/70 [.theme-light_&]:bg-ink-50 [.theme-light_&]:text-ink-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Option</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {OPTIONS.map((o, i) => (
                  <tr key={o.name} className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02] [.theme-light_&]:bg-white"}>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-indigo-300 [.theme-light_&]:text-indigo-700">{o.name}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80 [.theme-light_&]:text-ink-700">{o.type}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-white/65 [.theme-light_&]:text-ink-500">{o.def}</td>
                    <td className="px-4 py-3 text-white/70 [.theme-light_&]:text-ink-600">{o.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
