import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTdi from "@/components/AboutTdi";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import TownShip from "@/components/TownShip";
import Intregrate from "@/components/Intregrate";
import Properties from "@/components/Properties";
import Awards from "@/components/Awards";
import WhyTdi from "@/components/WhyTdi";
import Brands from "@/components/Brands";
import BlogSection from "@/components/BlogSection";
import HeroMedia from "@/components/Hero";
import SectionIntro from "@/components/AboutTdi";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      <GlobalAnimation />
      {/* <Header /> */}
      <HeroMedia
        type="video"
        src="/assets/videos/homepage-2.mp4"
      />
      <SectionIntro
        title="Tdi City Kundli"
        description="Spread across 1100+ acres, TDI City Kundli is a thoughtfully envisioned integrated township that redefines modern living. Designed as a self sustained urban ecosystem, it seamlessly brings together residential, commercial, and recreational spaces to offer a balanced lifestyle marked by comfort, convenience, and tranquility."
        showBirds={true}
      />
      <TownShip />
      <Intregrate />
      <Properties />
      <Awards />
      <WhyTdi />
      <Brands />
      <BlogSection />

    </main>
  );
}
