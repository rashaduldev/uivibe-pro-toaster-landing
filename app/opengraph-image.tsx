import { ImageResponse } from "next/og";

export const alt = "uivibe-pro-toaster toast notification library";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#09090f",
          color: "#ffffff",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            padding: "48px 56px",
            width: "100%",
          }}
        >
          <div style={{ color: "#a5b4fc", display: "flex", fontSize: 28 }}>
            uivibe-pro-toaster
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.08 }}>
            Lightweight JavaScript toast notifications
          </div>
          <div style={{ color: "#cbd5e1", display: "flex", fontSize: 28 }}>
            React, Next.js, Vue, and Vanilla JS. Zero dependencies. Under 5 kB gzipped.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

