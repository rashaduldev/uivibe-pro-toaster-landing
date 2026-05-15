import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "uivibe-pro-toaster — Premium toasts in <5 kB. Anywhere.",
  description:
    "A zero-dependency, universal toast notification library for Vanilla JS, React, Vue, Next.js and every other JavaScript environment. Glassmorphism, swipe-to-dismiss, full ARIA, in under 5 kB gzipped.",
  keywords: [
    "toast",
    "notification",
    "react toast",
    "vue toast",
    "vanilla js",
    "nextjs",
    "uivibe-pro-toaster",
  ],
  authors: [{ name: "uivibe" }],
  openGraph: {
    title: "uivibe-pro-toaster",
    description: "Premium toasts in <5 kB. Anywhere.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
