import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import ContactForm from "@/components/contact/ContactForm";
import BottomContact from "@/components/contact/BottomContact";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia
                type="image"
                src="/assets/images/hero.png"
            />
            <ContactForm />
            <BottomContact />
        </main>
    );
}