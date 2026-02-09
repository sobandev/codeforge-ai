import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { ChallengesPreview } from "@/components/landing/challenges-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FAQSection } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta-section";
import { FuturePlans } from "@/components/landing/future-plans";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <ChallengesPreview />
      <HowItWorks />
      <FuturePlans />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
