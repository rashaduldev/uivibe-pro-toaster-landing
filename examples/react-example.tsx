/**
 * React / Next.js usage example.
 *
 *   npm install uivibe-pro-toaster
 *
 * In Next.js App Router, drop this in a Client Component (or anywhere on the client).
 */
"use client";

import { useEffect } from "react";
import { toast } from "uivibe-pro-toaster";

export default function ToastDemo() {
  useEffect(() => {
    toast.configure({ position: "bottom-right", duration: 4000, theme: "auto" });
  }, []);

  const handleSave = async (): Promise<void> => {
    await toast.promise(
      fetch("/api/listings", { method: "POST" }).then((r) => {
        if (!r.ok) throw new Error("Save failed");
        return r.json();
      }),
      {
        loading: "Saving listing…",
        success: (data: { id: number }) => `Saved listing #${data.id}`,
        error: (err) => (err instanceof Error ? err.message : "Save failed"),
      },
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <button onClick={() => toast.success("Listing saved!")}>Success</button>
      <button onClick={() => toast.error("Something broke")}>Error</button>
      <button onClick={() => toast.info("New update available")}>Info</button>
      <button onClick={() => toast.warning("Low disk space")}>Warning</button>
      <button onClick={handleSave}>Promise demo</button>
      <button onClick={() => toast.dismiss()}>Dismiss all</button>
    </div>
  );
}
