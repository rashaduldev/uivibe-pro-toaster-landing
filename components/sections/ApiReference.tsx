const METHODS = [
  { sig: "toast(message, options?)", returns: "string", desc: "Show a default-type toast. Returns the toast id." },
  { sig: "toast.success(message, options?)", returns: "string", desc: "Green success toast with checkmark icon." },
  { sig: "toast.error(message, options?)", returns: "string", desc: "Red error toast; uses role=\"alert\", aria-live=\"assertive\"." },
  { sig: "toast.info(message, options?)", returns: "string", desc: "Blue info toast." },
  { sig: "toast.warning(message, options?)", returns: "string", desc: "Amber warning toast." },
  { sig: "toast.loading(message, options?)", returns: "string", desc: "Sticky toast with spinner — duration defaults to Infinity." },
  { sig: "toast.promise(promise, messages, options?)", returns: "Promise<T>", desc: "Pipes a promise through loading → success/error toasts." },
  { sig: "toast.update(id, partial)", returns: "void", desc: "Mutate type, message, description, or duration of a live toast." },
  { sig: "toast.dismiss(id?)", returns: "void", desc: "Dismiss one (by id) or all toasts when id is omitted." },
  { sig: "toast.configure(globalConfig)", returns: "void", desc: "Set default options applied to every subsequent call." },
];

export function ApiReference() {
  return (
    <section id="api" className="section">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="h-eyebrow">11 · API reference</span>
          <h2 className="h-section-title">Ten methods. That&apos;s the whole API.</h2>
          <p className="h-section-sub">
            Fully typed. Importable as named export <code className="code text-blue-300">{`{ toast }`}</code> or default.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 [.theme-light_&]:border-ink-200">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-white/[0.04] text-left text-white/70 [.theme-light_&]:bg-ink-50 [.theme-light_&]:text-ink-600">
              <tr>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Returns</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {METHODS.map((m, i) => (
                <tr key={m.sig} className={i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02] [.theme-light_&]:bg-white"}>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-blue-300 [.theme-light_&]:text-blue-700">{m.sig}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-white/80 [.theme-light_&]:text-ink-700">{m.returns}</td>
                  <td className="px-4 py-3 text-white/70 [.theme-light_&]:text-ink-600">{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
