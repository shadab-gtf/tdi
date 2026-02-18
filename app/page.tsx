import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutTdi from "@/components/AboutTdi";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import TownShip from "@/components/TownShip";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      <GlobalAnimation />
      <Header />
      <Hero />
      <AboutTdi />
      <TownShip />
      <div className="h-screen bg-zinc-100 flex items-center justify-center">
        <p className="text-2xl text-zinc-500">Scroll for more content...</p>
      </div>
    </main>
  );
}
