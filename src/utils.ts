export const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

let counter = 0;
export function uid(prefix = "uvt"): string {
  counter = (counter + 1) % 1_000_000;
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function prefersDark(): boolean {
  if (!isBrowser || !window.matchMedia) return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
