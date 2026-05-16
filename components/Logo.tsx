interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        viewBox="0 0 40 40"
        fill="none"
      >
        <defs>
          <linearGradient id="logo-shell" x1="6" y1="5" x2="34" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7DA2FF" />
            <stop offset="1" stopColor="#2F6BFF" />
          </linearGradient>
          <linearGradient id="logo-glow" x1="11" y1="11" x2="29" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.96" />
            <stop offset="1" stopColor="white" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M8 14.5C8 10.36 11.36 7 15.5 7h9C28.64 7 32 10.36 32 14.5v8C32 26.64 28.64 30 24.5 30H18l-6.8 4.6c-.95.64-2.2-.04-2.2-1.18V14.5Z"
          fill="url(#logo-shell)"
        />
        <path
          d="M14 15.5c0-1.93 1.57-3.5 3.5-3.5h5c1.93 0 3.5 1.57 3.5 3.5v3c0 1.93-1.57 3.5-3.5 3.5H21l-4.1 2.75c-.57.38-1.32-.03-1.32-.71V22H17.5A3.5 3.5 0 0 1 14 18.5v-3Z"
          fill="url(#logo-glow)"
        />
        <path d="M27.5 8.5 29 5l1.5 3.5L34 10l-3.5 1.5L29 15l-1.5-3.5L24 10l3.5-1.5Z" fill="#F8FAFC" />
      </svg>
      {compact ? null : (
        <span className="leading-none">
          <span className="block text-[15px] font-semibold tracking-[0.01em]">uivibe</span>
          <span className="block text-xs text-white/55 [.theme-light_&]:text-ink-500">pro-toaster</span>
        </span>
      )}
    </span>
  );
}
