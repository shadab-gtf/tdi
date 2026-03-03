// import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import FaqSection from "@/components/FaqSection";

export default function FAQ() {
    return (
        <main className="relative w-full pt-20 h-full pb-10 ">
            <GlobalAnimation />
            {/* <HeroMedia
                type="image"
                src="/assets/images/hero.png"
            /> */}
            <FaqSection />
        </main>
    );
}