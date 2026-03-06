import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import SectionIntro from "@/components/AboutTdi";
import PressSection from "@/components/Press/PressSection";

export default function Press() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="image"
                src="/assets/hero-images/press.jpg"
            />
            <SectionIntro
                title=" In The News"
                description="Stay updated with the latest news, press coverage, and official announcements related to TDI developments. This section highlights milestones, project updates, and media features that reflect our ongoing growth and long-term vision."
                showBirds={false}
            />
            <PressSection />
        </main>
    );
}