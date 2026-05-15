export const FAQ = [
  {
    q: "How big is the bundle, really?",
    a: "Under 5 kB gzipped for every output (ESM, CJS, and IIFE/browser-global). No CSS file to import - styles are injected on first call.",
  },
  {
    q: "Do I need a <Toaster /> provider?",
    a: "No. The library uses a singleton manager that auto-mounts on the first toast call. Works the same in Vanilla JS, React, Vue, and any other DOM environment.",
  },
  {
    q: "Is it SSR-safe with Next.js App Router?",
    a: "Yes. Every browser API access is guarded by typeof window !== 'undefined'. Call toast() from any client component or event handler.",
  },
  {
    q: "Can I customize the look?",
    a: "Override any of the ~15 CSS variables (--uvt-bg, --uvt-radius, --uvt-accent, ...) anywhere in your stylesheet, or pass className / style per toast.",
  },
  {
    q: "How does the queue work?",
    a: "Each position has its own visible-set and FIFO queue. When maxVisible is reached, new toasts wait. As old toasts dismiss, the queue promotes the next entry.",
  },
  {
    q: "Does swipe-to-dismiss work on mobile?",
    a: "Yes - it uses Pointer Events, which unify mouse and touch input. Drag past 80 px to dismiss; release earlier to snap back.",
  },
  {
    q: "Can I update a toast after it's shown?",
    a: "Yes - toast.update(id, { type, message, duration }) hot-swaps the content. This is exactly how toast.promise transitions loading to success.",
  },
  {
    q: "Is it tree-shakeable?",
    a: "Yes. The package is marked sideEffects: false and ships ESM. Bundlers will only include the methods you actually call.",
  },
];

