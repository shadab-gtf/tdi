
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import Intregrate from "@/components/Intregrate";
import HeroMedia from "@/components/Hero";
import Infrastructure from "@/components/about/Infrastructure";
import Ticker from "@/components/about/Ticker";
import Leadership from "@/components/about/Leadership";
import OurStory from "@/components/about/OurStory";
import Connectivity from "@/components/about/Connectivity";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="video"
                src="/assets/hero.mp4"
                poster="/assets/images/hero-poster.jpg"
            />
            <Infrastructure />
            <Ticker />
            <Leadership />
            <OurStory />
            <Connectivity />

        </main>
    );
}
