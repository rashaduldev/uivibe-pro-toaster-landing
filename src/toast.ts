import { ICONS } from "./icons";
import type { ToastOptions, ToastType } from "./types";

type DismissCb = (id: string) => void;

export class Toast {
  readonly id: string;
  readonly el: HTMLElement;
  options: ToastOptions;
  message: string;
  private titleEl: HTMLElement;
  private descEl: HTMLElement | null = null;
  private iconEl: HTMLElement | null = null;
  private progressEl: HTMLElement | null = null;
  private actionEl: HTMLButtonElement | null = null;
  private closeEl: HTMLButtonElement | null = null;
  private timer: number | null = null;
  private remaining: number;
  private startedAt = 0;
  private paused = false;
  private dragStartX = 0;
  private dragX = 0;
  private dragging = false;
  private onDismissCb: DismissCb;

  constructor(id: string, message: string, options: ToastOptions, onDismiss: DismissCb) {
    this.id = id;
    this.message = message;
    this.options = options;
    this.onDismissCb = onDismiss;
    this.remaining = options.duration ?? 0;

    const el = document.createElement("div");
    el.className = `uvt${options.className ? " " + options.className : ""}`;
    el.setAttribute("data-id", id);
    el.setAttribute("data-type", options.type ?? "default");
    el.setAttribute("data-state", "hidden");
    el.setAttribute("data-pos", options.position ?? "top-right");
    if (options.theme && options.theme !== "auto") el.setAttribute("data-theme", options.theme);
    const isError = options.type === "error";
    el.setAttribute("role", isError ? "alert" : "status");
    el.setAttribute("aria-live", isError ? "assertive" : "polite");
    if (options.style) Object.assign(el.style, options.style);

    if (options.html) {
      el.innerHTML = options.html;
      this.titleEl = el;
    } else {
      // Icon
      if (options.icon !== false) {
        const iconHtml =
          typeof options.icon === "string"
            ? options.icon
            : options.type && options.type !== "default"
              ? ICONS[options.type]
              : "";
        if (iconHtml) {
          const icon = document.createElement("span");
          icon.className = "uvt-icon";
          icon.innerHTML = iconHtml;
          el.appendChild(icon);
          this.iconEl = icon;
        }
      }

      // Body
      const body = document.createElement("div");
      body.className = "uvt-body";

      const title = document.createElement("div");
      title.className = "uvt-title";
      title.textContent = message;
      body.appendChild(title);
      this.titleEl = title;

      if (options.description) {
        const desc = document.createElement("div");
        desc.className = "uvt-desc";
        desc.textContent = options.description;
        body.appendChild(desc);
        this.descEl = desc;
      }

      if (options.action) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "uvt-action";
        btn.textContent = options.action.label;
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          options.action!.onClick(this.id);
        });
        body.appendChild(btn);
        this.actionEl = btn;
      }

      el.appendChild(body);

      // Close
      if (options.dismissible !== false) {
        const close = document.createElement("button");
        close.type = "button";
        close.className = "uvt-close";
        close.setAttribute("aria-label", "Dismiss notification");
        close.innerHTML = "&times;";
        close.addEventListener("click", (e) => {
          e.stopPropagation();
          this.dismiss();
        });
        el.appendChild(close);
        this.closeEl = close;
      }

      // Progress
      if (options.progress !== false && isFinite(this.remaining) && this.remaining > 0) {
        const progress = document.createElement("div");
        progress.className = "uvt-progress";
        progress.style.animationDuration = `${this.remaining}ms`;
        el.appendChild(progress);
        this.progressEl = progress;
      }
    }

    if (options.onClick) {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => options.onClick!(this.id));
    }

    this.el = el;
    this.bindHover();
    this.bindSwipe();
  }

  show(): void {
    requestAnimationFrame(() => {
      this.el.setAttribute("data-state", "visible");
      this.startTimer();
      this.options.onShow?.(this.id);
    });
  }

  update(partial: Partial<ToastOptions> & { message?: string }): void {
    if (partial.message !== undefined) {
      this.message = partial.message;
      if (this.titleEl) this.titleEl.textContent = partial.message;
    }
    if (partial.description !== undefined) {
      if (this.descEl) this.descEl.textContent = partial.description;
    }
    if (partial.type !== undefined) {
      this.el.setAttribute("data-type", partial.type);
      if (this.iconEl && partial.type !== "default") {
        this.iconEl.innerHTML = ICONS[partial.type as Exclude<ToastType, "default">] ?? "";
      }
    }
    if (partial.duration !== undefined) {
      this.remaining = partial.duration;
      this.startedAt = performance.now();
      if (this.progressEl) {
        this.progressEl.style.animation = "none";
        // force reflow then re-apply
        void this.progressEl.offsetWidth;
        this.progressEl.style.animation = "";
        this.progressEl.style.animationDuration = `${partial.duration}ms`;
      }
      this.clearTimer();
      this.startTimer();
    }
    this.options = { ...this.options, ...partial };
  }

  dismiss(): void {
    this.clearTimer();
    this.el.setAttribute("data-state", "hidden");
    const handler = (): void => {
      this.el.removeEventListener("transitionend", handler);
      this.options.onDismiss?.(this.id);
      this.onDismissCb(this.id);
    };
    this.el.addEventListener("transitionend", handler);
    // Failsafe in case transitionend never fires.
    window.setTimeout(handler, 400);
  }

  private startTimer(): void {
    if (!isFinite(this.remaining) || this.remaining <= 0) return;
    this.startedAt = performance.now();
    this.timer = window.setTimeout(() => this.dismiss(), this.remaining);
  }

  private clearTimer(): void {
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private pause(): void {
    if (this.paused || !isFinite(this.remaining)) return;
    this.paused = true;
    this.el.setAttribute("data-paused", "true");
    const elapsed = performance.now() - this.startedAt;
    this.remaining = Math.max(0, this.remaining - elapsed);
    this.clearTimer();
  }

  private resume(): void {
    if (!this.paused) return;
    this.paused = false;
    this.el.removeAttribute("data-paused");
    this.startTimer();
  }

  private bindHover(): void {
    if (this.options.pauseOnHover === false) return;
    this.el.addEventListener("mouseenter", () => this.pause());
    this.el.addEventListener("mouseleave", () => this.resume());
    this.el.addEventListener("focusin", () => this.pause());
    this.el.addEventListener("focusout", () => this.resume());
  }

  private bindSwipe(): void {
    if (this.options.swipeToDismiss === false) return;
    const onDown = (e: PointerEvent): void => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      this.dragging = true;
      this.dragStartX = e.clientX;
      this.dragX = 0;
      this.el.setAttribute("data-dragging", "true");
      this.el.setPointerCapture(e.pointerId);
      this.pause();
    };
    const onMove = (e: PointerEvent): void => {
      if (!this.dragging) return;
      this.dragX = e.clientX - this.dragStartX;
      this.el.style.transform = `translateX(${this.dragX}px)`;
      this.el.style.opacity = `${Math.max(0, 1 - Math.abs(this.dragX) / 200)}`;
    };
    const onUp = (e: PointerEvent): void => {
      if (!this.dragging) return;
      this.dragging = false;
      this.el.removeAttribute("data-dragging");
      try {
        this.el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      if (Math.abs(this.dragX) > 80) {
        const dir = this.dragX > 0 ? 1 : -1;
        this.el.style.transform = `translateX(${dir * 400}px)`;
        this.el.style.opacity = "0";
        window.setTimeout(() => this.dismiss(), 180);
      } else {
        this.el.style.transform = "";
        this.el.style.opacity = "";
        this.resume();
      }
    };
    this.el.addEventListener("pointerdown", onDown);
    this.el.addEventListener("pointermove", onMove);
    this.el.addEventListener("pointerup", onUp);
    this.el.addEventListener("pointercancel", onUp);
  }
}
