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

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      <GlobalAnimation />
      {/* <Header /> */}
      <HeroMedia
        type="image"
        src="/assets/images/hero.png"
      />
      <AboutTdi />
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
