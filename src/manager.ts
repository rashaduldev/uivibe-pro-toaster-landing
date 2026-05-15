import { injectStyles } from "./styles";
import { Toast } from "./toast";
import type { GlobalConfig, Position, ToastOptions } from "./types";
import { isBrowser, prefersDark, uid } from "./utils";

interface QueueEntry {
  id: string;
  message: string;
  options: ToastOptions;
}

const DEFAULTS: GlobalConfig = {
  position: "top-right",
  duration: 4000,
  maxVisible: 4,
  theme: "auto",
  gap: 12,
  zIndex: 9999,
  pauseOnHover: true,
  swipeToDismiss: true,
  progress: true,
  dismissible: true,
};

export class ToastManager {
  private static _instance: ToastManager | null = null;
  private config: GlobalConfig = { ...DEFAULTS };
  private root: HTMLElement | null = null;
  private stacks = new Map<Position, HTMLElement>();
  private visible = new Map<string, Toast>();
  private byPosition = new Map<Position, Set<string>>();
  private queues = new Map<Position, QueueEntry[]>();
  private prefersDarkMql: MediaQueryList | null = null;

  static get instance(): ToastManager {
    if (!this._instance) this._instance = new ToastManager();
    return this._instance;
  }

  configure(partial: Partial<GlobalConfig>): void {
    this.config = { ...this.config, ...partial };
    if (this.root) {
      this.root.style.setProperty("--uvt-z-index", String(this.config.zIndex));
      this.root.style.setProperty("--uvt-gap", `${this.config.gap}px`);
    }
    if (this.config.theme === "auto") this.applyAutoTheme();
    else if (this.root) this.root.setAttribute("data-theme", this.config.theme);
  }

  show(message: string, options: ToastOptions = {}): string {
    if (!isBrowser) return options.id ?? uid();
    this.ensureRoot();
    const id = options.id ?? uid();
    const merged: ToastOptions = {
      type: "default",
      duration: this.config.duration,
      position: this.config.position,
      dismissible: this.config.dismissible,
      pauseOnHover: this.config.pauseOnHover,
      swipeToDismiss: this.config.swipeToDismiss,
      progress: this.config.progress,
      theme: this.config.theme,
      ...options,
      id,
    };
    if (merged.type === "loading" && merged.duration === DEFAULTS.duration) {
      merged.duration = Infinity;
    }
    const position = merged.position!;
    const set = this.posSet(position);
    if (set.size >= this.config.maxVisible) {
      this.posQueue(position).push({ id, message, options: merged });
      return id;
    }
    this.render(id, message, merged);
    return id;
  }

  update(id: string, partial: Partial<ToastOptions> & { message?: string }): void {
    const t = this.visible.get(id);
    if (t) {
      t.update(partial);
      return;
    }
    // Update queued entry if still pending
    for (const queue of this.queues.values()) {
      const entry = queue.find((q) => q.id === id);
      if (entry) {
        if (partial.message !== undefined) entry.message = partial.message;
        entry.options = { ...entry.options, ...partial };
        return;
      }
    }
  }

  dismiss(id?: string): void {
    if (id) {
      const t = this.visible.get(id);
      if (t) {
        t.dismiss();
        return;
      }
      for (const [pos, queue] of this.queues) {
        const idx = queue.findIndex((q) => q.id === id);
        if (idx >= 0) {
          queue.splice(idx, 1);
          this.queues.set(pos, queue);
          return;
        }
      }
      return;
    }
    for (const t of this.visible.values()) t.dismiss();
    for (const queue of this.queues.values()) queue.length = 0;
  }

  private render(id: string, message: string, options: ToastOptions): void {
    const position = options.position!;
    const stack = this.ensureStack(position);
    const toast = new Toast(id, message, options, (closedId) => this.handleDismissed(closedId, position));
    if (position.startsWith("bottom-")) {
      stack.appendChild(toast.el);
    } else {
      stack.insertBefore(toast.el, stack.firstChild);
    }
    this.visible.set(id, toast);
    this.posSet(position).add(id);
    toast.show();
  }

  private handleDismissed(id: string, position: Position): void {
    const t = this.visible.get(id);
    if (t && t.el.parentNode) t.el.parentNode.removeChild(t.el);
    this.visible.delete(id);
    this.posSet(position).delete(id);
    const queue = this.posQueue(position);
    const next = queue.shift();
    if (next) this.render(next.id, next.message, next.options);
  }

  private ensureRoot(): void {
    if (this.root) return;
    injectStyles();
    const root = document.createElement("div");
    root.className = "uvt-root";
    root.setAttribute("role", "region");
    root.setAttribute("aria-label", "Notifications");
    root.style.setProperty("--uvt-z-index", String(this.config.zIndex));
    root.style.setProperty("--uvt-gap", `${this.config.gap}px`);
    if (this.config.theme === "auto") {
      root.setAttribute("data-theme", prefersDark() ? "dark" : "light");
      if (window.matchMedia) {
        this.prefersDarkMql = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (): void => this.applyAutoTheme();
        if (this.prefersDarkMql.addEventListener) this.prefersDarkMql.addEventListener("change", listener);
      }
    } else {
      root.setAttribute("data-theme", this.config.theme);
    }
    document.body.appendChild(root);
    this.root = root;
  }

  private applyAutoTheme(): void {
    if (!this.root) return;
    this.root.setAttribute("data-theme", prefersDark() ? "dark" : "light");
  }

  private ensureStack(position: Position): HTMLElement {
    let stack = this.stacks.get(position);
    if (stack) return stack;
    stack = document.createElement("div");
    stack.className = "uvt-stack";
    stack.setAttribute("data-pos", position);
    this.root!.appendChild(stack);
    this.stacks.set(position, stack);
    return stack;
  }

  private posSet(position: Position): Set<string> {
    let s = this.byPosition.get(position);
    if (!s) {
      s = new Set();
      this.byPosition.set(position, s);
    }
    return s;
  }

  private posQueue(position: Position): QueueEntry[] {
    let q = this.queues.get(position);
    if (!q) {
      q = [];
      this.queues.set(position, q);
    }
    return q;
  }
}
