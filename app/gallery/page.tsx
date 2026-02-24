import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import GalleryComponent from "@/components/gallery/Gallery";
import Testimonial from "@/components/gallery/Testimonial";

export default function GalleryPage() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="image"
                src="/assets/gallery/hero.jpg"
            />
            <GalleryComponent />
            <Testimonial />
        </main>
    );
}