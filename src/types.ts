export type ToastType =
  | "default"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "loading";

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Theme = "light" | "dark" | "auto";

export interface ToastAction {
  label: string;
  onClick: (id: string) => void;
}

export interface ToastOptions {
  id?: string;
  type?: ToastType;
  duration?: number;
  position?: Position;
  icon?: string | false;
  dismissible?: boolean;
  pauseOnHover?: boolean;
  swipeToDismiss?: boolean;
  progress?: boolean;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  theme?: Theme;
  html?: string;
  description?: string;
  action?: ToastAction;
  onShow?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onClick?: (id: string) => void;
}

export interface PromiseMessages<T> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((err: unknown) => string);
}

export interface GlobalConfig {
  position: Position;
  duration: number;
  maxVisible: number;
  theme: Theme;
  gap: number;
  zIndex: number;
  pauseOnHover: boolean;
  swipeToDismiss: boolean;
  progress: boolean;
  dismissible: boolean;
}

export interface ToastApi {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  custom: (message: string, options?: ToastOptions) => string;
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    messages: PromiseMessages<T>,
    options?: ToastOptions,
  ) => Promise<T>;
  update: (id: string, options: Partial<ToastOptions> & { message?: string }) => void;
  dismiss: (id?: string) => void;
  configure: (config: Partial<GlobalConfig>) => void;
}
