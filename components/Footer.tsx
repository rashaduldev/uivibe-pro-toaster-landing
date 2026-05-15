import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 [.theme-light_&]:border-ink-200">
      <div className="container-x flex flex-col items-center justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-4">
          <Logo compact />
          <p className="text-sm text-white/60 [.theme-light_&]:text-ink-500">
            Built with care by uivibe. MIT licensed.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70 [.theme-light_&]:text-ink-600">
          <a href="https://www.npmjs.com/package/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="hover:underline">npm</a>
          <a href="https://github.com/rashaduldev/uivibe-pro-toaster" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href="#api" className="hover:underline">API</a>
          <a href="#install" className="hover:underline">Install</a>
        </div>
      </div>
    </footer>
  );
}
