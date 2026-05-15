export const SNIPPETS = {
  install: {
    npm: "npm install uivibe-pro-toaster",
    pnpm: "pnpm add uivibe-pro-toaster",
    yarn: "yarn add uivibe-pro-toaster",
    bun: "bun add uivibe-pro-toaster",
    cdnUnpkg: '<script src="https://unpkg.com/uivibe-pro-toaster/dist/index.global.js"></script>',
    cdnJsdelivr: '<script src="https://cdn.jsdelivr.net/npm/uivibe-pro-toaster/dist/index.global.js"></script>',
  },

  quickstart: `import { toast } from "uivibe-pro-toaster";

toast.success("Listing saved!");
toast.error("Something broke", { duration: 6000 });
toast.info("Heads up — new update available");

// Promise pipeline:
toast.promise(api.save(form), {
  loading: "Saving…",
  success: "Saved!",
  error:   "Failed to save",
});
`,

  vanilla: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Toast demo</title>
  </head>
  <body>
    <button id="b">Save</button>

    <script src="https://unpkg.com/uivibe-pro-toaster/dist/index.global.js"></script>
    <script>
      Toast.configure({ position: "top-right", duration: 4000, theme: "auto" });

      document.getElementById("b").addEventListener("click", () => {
        Toast.success("Listing saved!");
      });
    </script>
  </body>
</html>
`,

  react: `// app/components/SaveButton.tsx
"use client";

import { useEffect } from "react";
import { toast } from "uivibe-pro-toaster";

export default function SaveButton() {
  useEffect(() => {
    toast.configure({ position: "bottom-right", theme: "auto" });
  }, []);

  const save = async () => {
    await toast.promise(fetch("/api/save").then((r) => r.json()), {
      loading: "Saving…",
      success: (data) => \`Saved #\${data.id}\`,
      error:   (err)  => \`Failed: \${err.message}\`,
    });
  };

  return <button onClick={save}>Save listing</button>;
}
`,

  nextLayout: `// app/layout.tsx — App Router
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// No provider component needed — uivibe-pro-toaster mounts itself
// on first call and is fully SSR-safe.
`,

  vue: `<!-- App.vue -->
<script setup lang="ts">
import { onMounted } from "vue";
import { toast } from "uivibe-pro-toaster";

onMounted(() => toast.configure({ position: "top-center", theme: "auto" }));

const save = () => toast.success("Listing saved!");
</script>

<template>
  <button @click="save">Save</button>
</template>
`,

  promise: `import { toast } from "uivibe-pro-toaster";

async function saveListing(form: FormData) {
  return toast.promise(
    fetch("/api/listings", { method: "POST", body: form }).then((r) => {
      if (!r.ok) throw new Error("Bad request");
      return r.json();
    }),
    {
      loading: "Saving listing…",
      success: (data) => \`Saved listing #\${data.id}\`,
      error:   (err)  => err instanceof Error ? err.message : "Failed",
    },
    { duration: 5000 },
  );
}
`,

  configure: `// Set defaults once, anywhere on the client.
import { toast } from "uivibe-pro-toaster";

toast.configure({
  position:       "bottom-right",  // 9 positions
  duration:       5000,            // ms — Infinity for sticky
  maxVisible:     4,               // queue overflow per position
  gap:            12,              // px between stacked toasts
  theme:          "auto",          // 'light' | 'dark' | 'auto'
  zIndex:         9999,
  pauseOnHover:   true,
  swipeToDismiss: true,
  progress:       true,
  dismissible:    true,
});
`,

  theming: `/* Override any of these CSS variables anywhere in your app. */
:root {
  --uvt-bg:        rgba(255, 255, 255, 0.85);
  --uvt-text:      #0f172a;
  --uvt-muted:     #475569;
  --uvt-border:    rgba(15, 23, 42, 0.08);
  --uvt-radius:    16px;
  --uvt-shadow:    0 12px 40px -10px rgba(15, 23, 42, .25);
  --uvt-success:   #16a34a;
  --uvt-error:     #dc2626;
  --uvt-info:      #2563eb;
  --uvt-warning:   #d97706;
  --uvt-accent:    #6366f1;
  --uvt-gap:       14px;
  --uvt-padding:   14px 16px;
  --uvt-z-index:   9999;
  --uvt-font:      "Inter", system-ui, sans-serif;
}
`,

  customHtml: `toast("", {
  html: \`
    <div style="display:flex;gap:10px;align-items:center;padding:6px">
      <img src="/avatar.png" width="36" height="36" style="border-radius:50%" />
      <div>
        <strong>New message</strong>
        <div style="opacity:.7;font-size:13px">Sara liked your listing</div>
      </div>
    </div>\`,
  duration: 6000,
});
`,
} as const;
