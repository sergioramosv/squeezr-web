import { HeroSection } from "./sections/HeroV2";
import { CursorAnnouncement } from "@/components/CursorAnnouncement";
import { LogoCloud } from "@/components/LogoCloud";
import { CompressionVisualizer } from "@/components/CompressionVisualizer";
import { PipelineFlow } from "@/components/PipelineFlow";
import { BentoGrid } from "@/components/BentoGrid";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HowItWorks } from "./sections/HowItWorks";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { CTASection } from "./sections/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CursorAnnouncement />
      <LogoCloud />
      <CompressionVisualizer />
      <PipelineFlow />
      <BentoGrid />
      <BeforeAfter />
      <HowItWorks />
      <SavingsCalculator />
      <CTASection />
      <Footer />
    </>
  );
}
