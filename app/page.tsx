import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Playground } from "@/components/sections/Playground";
import { Features } from "@/components/sections/Features";
import { Installation } from "@/components/sections/Installation";
import { QuickStart } from "@/components/sections/QuickStart";
import { VanillaUsage } from "@/components/sections/VanillaUsage";
import { ReactUsage } from "@/components/sections/ReactUsage";
import { VueUsage } from "@/components/sections/VueUsage";
import { PromiseDemo } from "@/components/sections/PromiseDemo";
import { ApiReference } from "@/components/sections/ApiReference";
import { ConfigOptions } from "@/components/sections/ConfigOptions";
import { ThemingShowcase } from "@/components/sections/ThemingShowcase";
import { PositionsGrid } from "@/components/sections/PositionsGrid";
import { Accessibility } from "@/components/sections/Accessibility";
import { FaqCta } from "@/components/sections/FaqCta";
import { FAQ } from "@/lib/faq";
import { siteConfig } from "@/lib/site";

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  url: siteConfig.url,
  downloadUrl: siteConfig.npmUrl,
  softwareVersion: "1.0.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([websiteJsonLd, softwareApplicationJsonLd, faqJsonLd]),
        }}
      />
      <Hero />
      <Stats />
      <Playground />
      <Features />
      <Installation />
      <QuickStart />
      <VanillaUsage />
      <ReactUsage />
      <VueUsage />
      <PromiseDemo />
      <ApiReference />
      <ConfigOptions />
      <ThemingShowcase />
      <PositionsGrid />
      <Accessibility />
      <FaqCta />
    </>
  );
}
