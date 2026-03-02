import InfiniteScrollingLogosAnimation from "./InfiniteScrollingLogosAnimation";

export default function Brands() {
    return (
        <section className="py-12 md:py-20 bg-[var(--color-secondary)]">
            <div className="flex justify-center flex-col items-center gap-5 max-w-4xl mx-auto px-4  mb-20">

                <h3 className="text-center text-base md:text-[20px] font-regular text-[var(--color-accent)]! font-serif tracking-tight " data-aos="reveal-top">Brands On Board</h3>
                {/* <div className="w-[100px] h-[2px] bg-[var(--color-primary)]"></div> */}
                <h4 className="text-center text-lg md:text-[25px] font-regular font-serif tracking-tight " data-aos="fade-up" data-aos-delay="200">Prestigious names that define a complete lifestyle.</h4>
                <p className="text-center text-sm md:text-base font-regular font-serif tracking-tight " data-aos="fade-up" data-aos-delay="300">TDI City Kundli is home to leading brands, enhancing retail, education, and lifestyle spaces. These partnerships elevate quality, accessibility, and convenience for a sophisticated living experience.</p>

            </div>
            <InfiniteScrollingLogosAnimation />
        </section>
    );
}