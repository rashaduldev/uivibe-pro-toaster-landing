import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm", "cjs", "iife"],
  globalName: "Toast",
  outExtension({ format }) {
    if (format === "esm") return { js: ".mjs" };
    if (format === "cjs") return { js: ".cjs" };
    return { js: ".global.js" };
  },
  target: "es2019",
  platform: "browser",
  dts: true,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  shims: false,
  legacyOutput: false,
  footer: ({ format }) => {
    if (format === "iife") {
      return { js: "if(typeof window!=='undefined'&&window.Toast)window.Toast=window.Toast.default;" };
    }
    return {};
  },
});
