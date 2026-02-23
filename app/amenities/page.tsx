
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import HeroMedia from "@/components/Hero";
import Designed from "@/components/amenities/Designed";
import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import ClubHouse from "@/components/amenities/ClubHouse";
import Building from "@/components/amenities/Building";

export default function Amenities() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="video"
                src="/assets/videos/amenities.mp4"
                poster="/assets/images/hero-poster.jpg"
            />
            <Designed />
            <AmenitiesSection />
            <ClubHouse />
            <Building />
        </main>
    );
}

