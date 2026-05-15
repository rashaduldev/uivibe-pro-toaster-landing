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

export default function Home() {
  return (
    <>
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
