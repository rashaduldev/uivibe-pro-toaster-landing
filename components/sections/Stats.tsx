const ITEMS = [
  { v: "< 5 kB", l: "gzipped (ESM / CJS / UMD)" },
  { v: "0", l: "runtime dependencies" },
  { v: "100%", l: "TypeScript, fully typed" },
  { v: "9", l: "stack positions" },
  { v: "MIT", l: "permissive license" },
  { v: "A11Y", l: "ARIA-complete by default" },
];

export function Stats() {
  return (
    <section className="section py-10 md:py-12">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map((it) => (
            <div key={it.l} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white">
              <div className="text-xl font-semibold md:text-2xl">{it.v}</div>
              <div className="mt-1 text-xs text-white/60 [.theme-light_&]:text-ink-500">{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
