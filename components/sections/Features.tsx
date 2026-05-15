const FEATURES = [
  { icon: "🪶", title: "< 5 kB gzipped", desc: "Tiny, tree-shakeable, single file. No CSS to import." },
  { icon: "🧊", title: "Glassmorphism", desc: "Built-in backdrop-blur, themeable via CSS variables." },
  { icon: "⏳", title: "Promise API", desc: "loading → success / error transitions in one call." },
  { icon: "🧱", title: "Smart stacking", desc: "Per-position max-visible with FIFO queue overflow." },
  { icon: "👆", title: "Swipe to dismiss", desc: "Pointer events — mouse and touch — out of the box." },
  { icon: "⏸️", title: "Pause on hover", desc: "Real time tracking, not setTimeout drift." },
  { icon: "📍", title: "9 positions", desc: "Independent stacks per corner / edge / center." },
  { icon: "🌓", title: "Dark / Light / Auto", desc: "Reads prefers-color-scheme and updates live." },
  { icon: "♿", title: "Full ARIA", desc: "role=status / alert, aria-live, focusable close." },
  { icon: "🧬", title: "Custom HTML", desc: "Drop in any markup, avatars, actions, descriptions." },
  { icon: "🎨", title: "CSS variables", desc: "Every color, radius, shadow, font — overridable." },
  { icon: "🌐", title: "Universal", desc: "ESM / CJS / UMD — works with every framework." },
];

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">04 · What's in the box</span>
          <h2 className="h-section-title">Twelve premium features. Zero compromises.</h2>
          <p className="h-section-sub">
            Everything you'd reach for in a full-fat notification system, packed into a tiny universal bundle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card">
              <div className="text-2xl">{f.icon}</div>
              <div className="mt-3 text-base font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-white/65 [.theme-light_&]:text-ink-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
