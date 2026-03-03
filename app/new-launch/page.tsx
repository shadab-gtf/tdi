
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";

export default function NewLaunch() {
    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            {/* <HeroMedia
                type="image"
                src="/assets/images/hero.png"
            /> */}

            <h1 className="text-[10rem] font-bold font-serif flex justify-center items-center h-screen">
                New Launch
                <br />
                Coming Soon
            </h1>
        </main>
    );
}