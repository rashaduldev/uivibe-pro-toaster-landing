import type { ToastType } from "./types";

const S = (p: string): string =>
  `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

export const ICONS: Record<Exclude<ToastType, "default">, string> = {
  success: S(`<path d="M5 12l4 4 10-10"/>`),
  error: S(`<path d="M6 6l12 12M18 6L6 18"/>`),
  info: S(`<circle cx="12" cy="12" r="10"/><path d="M12 8h.01M12 11v5"/>`),
  warning: S(`<path d="M12 3L2 21h20L12 3zM12 10v4M12 18h.01"/>`),
  loading: `<span class="uvt-spinner"></span>`,
};
