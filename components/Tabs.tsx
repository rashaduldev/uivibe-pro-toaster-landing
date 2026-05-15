"use client";

import { useState, type ReactNode } from "react";

export interface Tab {
  label: string;
  content: ReactNode;
}

interface Props {
  tabs: Tab[];
  initial?: number;
}

export function Tabs({ tabs, initial = 0 }: Props) {
  const [i, setI] = useState(initial);
  return (
    <div className="w-full">
      <div role="tablist" className="mb-3 flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={idx === i}
            onClick={() => setI(idx)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              idx === i
                ? "bg-white/10 text-white [.theme-light_&]:bg-ink-100 [.theme-light_&]:text-ink-900"
                : "text-white/60 hover:text-white [.theme-light_&]:text-ink-500 [.theme-light_&]:hover:text-ink-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[i]?.content}</div>
    </div>
  );
}
