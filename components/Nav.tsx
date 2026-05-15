"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/providers";

const LINKS = [
  { href: "#playground", label: "Playground" },
  { href: "#features", label: "Features" },
  { href: "#install", label: "Install" },
  { href: "#api", label: "API" },
  { href: "#themes", label: "Theming" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? "border-b border-white/10 bg-[#0a0a14]/70 backdrop-blur-md [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white/80"
          : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-indigo-400 to-fuchsia-500" />
          <span>uivibe<span className="text-white/40 [.theme-light_&]:text-ink-400">/</span>pro-toaster</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm text-white/70 transition hover:text-white [.theme-light_&]:text-ink-600 [.theme-light_&]:hover:text-ink-900">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="pill-btn !px-2.5 !py-2">
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>
          <a href="https://www.npmjs.com/package/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="hidden btn-primary md:inline-flex">npm i</a>
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="pill-btn !px-2.5 !py-2 md:hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a14]/95 backdrop-blur md:hidden [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white/95">
          <div className="container-x flex flex-col px-4 py-3 sm:px-6">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm text-white/80 [.theme-light_&]:text-ink-700">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
