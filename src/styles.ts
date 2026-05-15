import { isBrowser } from "./utils";

const STYLE_ID = "uivibe-toaster-styles";

const CSS = `.uvt-root{position:fixed;inset:0;pointer-events:none;z-index:var(--uvt-z-index,9999);font-family:var(--uvt-font,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif)}
.uvt-stack{position:absolute;display:flex;flex-direction:column;gap:var(--uvt-gap,12px);padding:16px;max-width:min(420px,calc(100vw - 32px));box-sizing:border-box}
.uvt-stack[data-pos$="-right"]{right:0;align-items:flex-end}
.uvt-stack[data-pos$="-left"]{left:0;align-items:flex-start}
.uvt-stack[data-pos$="-center"]{left:50%;transform:translateX(-50%);align-items:center}
.uvt-stack[data-pos^="top-"]{top:0}
.uvt-stack[data-pos^="middle-"]{top:50%;transform:translateY(-50%)}
.uvt-stack[data-pos="middle-center"]{transform:translate(-50%,-50%)}
.uvt-stack[data-pos^="bottom-"]{bottom:0;flex-direction:column-reverse}
.uvt{--uvt-bg:rgba(255,255,255,.78);--uvt-text:#0f172a;--uvt-muted:#475569;--uvt-border:rgba(15,23,42,.08);--uvt-shadow:0 10px 30px -10px rgba(15,23,42,.25);--uvt-radius:12px;--uvt-padding:14px 16px;--uvt-success:#10b981;--uvt-error:#ef4444;--uvt-info:#3b82f6;--uvt-warning:#f59e0b;--uvt-accent:#6366f1;pointer-events:auto;position:relative;display:flex;align-items:flex-start;gap:12px;min-width:280px;max-width:100%;color:var(--uvt-text);background:var(--uvt-bg);border:1px solid var(--uvt-border);border-radius:var(--uvt-radius);padding:var(--uvt-padding);box-shadow:var(--uvt-shadow);backdrop-filter:blur(14px) saturate(180%);-webkit-backdrop-filter:blur(14px) saturate(180%);opacity:0;transform:translateY(-12px) scale(.96);transition:opacity .35s cubic-bezier(.21,1.02,.73,1),transform .35s cubic-bezier(.21,1.02,.73,1);overflow:hidden;will-change:transform,opacity;touch-action:pan-y}
.uvt[data-pos^="bottom-"]{transform:translateY(12px) scale(.96)}
.uvt[data-state="visible"]{opacity:1;transform:translateY(0) scale(1)}
.uvt[data-state="hidden"]{opacity:0;transform:translateY(-12px) scale(.92);transition-duration:.25s;transition-timing-function:cubic-bezier(.06,.71,.55,1)}
.uvt[data-pos^="bottom-"][data-state="hidden"]{transform:translateY(12px) scale(.92)}
.uvt[data-theme="dark"]{--uvt-bg:rgba(17,24,39,.78);--uvt-text:#f8fafc;--uvt-muted:#cbd5e1;--uvt-border:rgba(255,255,255,.08);--uvt-shadow:0 10px 30px -10px rgba(0,0,0,.5)}
.uvt-icon{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:999px;color:#fff;background:var(--c,var(--uvt-accent))}
.uvt[data-type="success"]{--c:var(--uvt-success)}
.uvt[data-type="error"]{--c:var(--uvt-error)}
.uvt[data-type="info"]{--c:var(--uvt-info)}
.uvt[data-type="warning"]{--c:var(--uvt-warning)}
.uvt[data-type="loading"] .uvt-icon,.uvt[data-type="default"] .uvt-icon{background:transparent;color:var(--uvt-accent)}
.uvt-body{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}
.uvt-title{font-size:14px;font-weight:600;line-height:1.4;word-break:break-word}
.uvt-desc{font-size:13px;line-height:1.45;color:var(--uvt-muted);word-break:break-word}
.uvt-action{margin-top:6px;align-self:flex-start;font:inherit;font-size:13px;font-weight:600;color:var(--uvt-accent);background:transparent;border:0;padding:4px 0;cursor:pointer}
.uvt-action:hover{text-decoration:underline}
.uvt-close{flex:0 0 auto;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:0;border-radius:6px;color:var(--uvt-muted);cursor:pointer;font-size:18px;line-height:1;padding:0}
.uvt-close:hover{background:rgba(127,127,127,.15);color:var(--uvt-text)}
.uvt-close:focus-visible{outline:2px solid var(--uvt-accent);outline-offset:2px}
.uvt-progress{position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--c,var(--uvt-accent));transform-origin:left;animation:uvt-progress linear forwards}
.uvt[data-paused="true"] .uvt-progress{animation-play-state:paused}
.uvt[data-dragging="true"]{transition:none;cursor:grabbing}
.uvt-spinner{display:inline-block;width:14px;height:14px;border-radius:50%;border:2px solid currentColor;border-right-color:transparent;animation:uvt-spin .7s linear infinite}
@keyframes uvt-progress{from{transform:scaleX(1)}to{transform:scaleX(0)}}
@keyframes uvt-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.uvt{transition-duration:.01ms}.uvt-progress,.uvt-spinner{animation-duration:.01ms!important}}`;

export function injectStyles(): void {
  if (!isBrowser) return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}
