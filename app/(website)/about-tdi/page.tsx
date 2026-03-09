import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import AboutTDISection from "@/components/about/About-tdi";

export default function AboutTDI() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="image"
                src="/assets/images/about/hero-tdi.png"
            />
            <AboutTDISection />
        </main>
    );
}