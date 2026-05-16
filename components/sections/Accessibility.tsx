const A11Y = [
  { title: "role=\"status\" / role=\"alert\"", body: "Errors use alert (assertive). All other types use status (polite) so they don't interrupt the user." },
  { title: "aria-live regions", body: "The container is a labelled region. Toasts are announced once and grouped by type." },
  { title: "Keyboard reachable", body: "Close buttons are real <button> elements; Tab focuses them, Enter dismisses." },
  { title: "Pause on focus", body: "Focusing a toast freezes its timer — useful for screen-reader users reading the content." },
  { title: "Respects reduced motion", body: "prefers-reduced-motion shrinks enter/exit transitions and progress animations to near-instant." },
  { title: "Color-blind friendly", body: "Iconography conveys type as well as color (✓, ✕, ⓘ, △)." },
];

const BROWSERS = [
  { name: "Chrome", v: "≥ 90" },
  { name: "Edge", v: "≥ 90" },
  { name: "Firefox", v: "≥ 88" },
  { name: "Safari", v: "≥ 14" },
  { name: "iOS Safari", v: "≥ 14" },
  { name: "Android", v: "Chrome ≥ 90" },
];

export function Accessibility() {
  return (
    <section id="accessibility" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">15 · Accessibility &amp; support</span>
          <h2 className="h-section-title">Built for everyone, on every modern browser.</h2>
          <p className="h-section-sub">
            ARIA-complete out of the box. <code className="code text-blue-300">backdrop-filter</code> degrades to a solid background on older engines.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {A11Y.map((a) => (
            <div key={a.title} className="card">
              <div className="font-mono text-sm text-blue-300 [.theme-light_&]:text-blue-700">{a.title}</div>
              <p className="mt-2 text-sm text-white/70 [.theme-light_&]:text-ink-600">{a.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-3 text-xs uppercase tracking-widest text-white/50 [.theme-light_&]:text-ink-500">Browser support</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {BROWSERS.map((b) => (
              <div key={b.name} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white">
                <div className="text-sm font-medium">{b.name}</div>
                <div className="mt-1 text-xs text-white/60 [.theme-light_&]:text-ink-500">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
