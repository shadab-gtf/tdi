import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import SectionIntro from "@/components/AboutTdi";
import SustainabilitySection from "@/components/CSR/SustainabilitySection";
import CommunityEngagement from "@/components/CSR/CommunityEngagement";
import ImpactGallery from "@/components/CSR/ImpactGallery";

export default function CSR() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="image"
                src="/assets/hero-images/csr-hero.jpg"
            />
            <SectionIntro
                title="Building Communities Beyond Infrastructure"
                description="At TDI City Kundli, development goes beyond real estate. We are committed to creating responsible, future-ready communities that balance growth with sustainability, social upliftment, and long-term value for the region."
                showBirds={false}
            />
            <SustainabilitySection />
            <CommunityEngagement />
            <ImpactGallery />
        </main>
    );
}