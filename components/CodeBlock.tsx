"use client";

import { useState } from "react";
import { toast } from "uivibe-pro-toaster";

interface Props {
  code: string;
  lang?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, lang = "ts", filename, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1400);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-ink-50 ${className}`}>
      {filename ? (
        <div className="flex min-w-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2 text-xs font-mono text-white/60 [.theme-light_&]:border-ink-200 [.theme-light_&]:text-ink-500">
          <span className="min-w-0 truncate">{filename}</span>
          <span className="rounded bg-white/5 px-1.5 py-0.5 [.theme-light_&]:bg-ink-200/60">{lang}</span>
        </div>
      ) : null}
      <pre className="code overflow-x-auto px-4 py-4 text-white/90 [.theme-light_&]:text-ink-800">
        <code>{code}</code>
      </pre>
      <button
        onClick={onCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/80 backdrop-blur transition hover:bg-white/15 group-hover:opacity-100 [.theme-light_&]:border-ink-200 [.theme-light_&]:bg-white [.theme-light_&]:text-ink-700"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
