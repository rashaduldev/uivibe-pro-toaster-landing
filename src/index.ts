import { ToastManager } from "./manager";
import type { PromiseMessages, ToastApi, ToastOptions } from "./types";

const manager = ToastManager.instance;

function call(message: string, options?: ToastOptions): string {
  return manager.show(message, options);
}

const api = call as ToastApi;

api.success = (message, options) => manager.show(message, { ...options, type: "success" });
api.error = (message, options) => manager.show(message, { ...options, type: "error" });
api.info = (message, options) => manager.show(message, { ...options, type: "info" });
api.warning = (message, options) => manager.show(message, { ...options, type: "warning" });
api.loading = (message, options) =>
  manager.show(message, { duration: Infinity, ...options, type: "loading" });
api.custom = (message, options) => manager.show(message, { ...options, type: "default" });

api.update = (id, options) => manager.update(id, options);
api.dismiss = (id) => manager.dismiss(id);
api.configure = (config) => manager.configure(config);

api.promise = <T,>(
  promise: Promise<T> | (() => Promise<T>),
  messages: PromiseMessages<T>,
  options?: ToastOptions,
): Promise<T> => {
  const id = manager.show(messages.loading, {
    duration: Infinity,
    ...options,
    type: "loading",
  });
  const run = typeof promise === "function" ? (promise as () => Promise<T>)() : promise;
  return run.then(
    (data) => {
      const msg =
        typeof messages.success === "function" ? messages.success(data) : messages.success;
      manager.update(id, {
        message: msg,
        type: "success",
        duration: options?.duration ?? 4000,
      });
      return data;
    },
    (err) => {
      const msg = typeof messages.error === "function" ? messages.error(err) : messages.error;
      manager.update(id, {
        message: msg,
        type: "error",
        duration: options?.duration ?? 4000,
      });
      throw err;
    },
  );
};

export const toast: ToastApi = api;
export default api;
export type {
  GlobalConfig,
  Position,
  PromiseMessages,
  Theme,
  ToastApi,
  ToastAction,
  ToastOptions,
  ToastType,
} from "./types";
