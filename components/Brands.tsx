import InfiniteScrollingLogosAnimation from "./InfiniteScrollingLogosAnimation";

export default function Brands() {
    return (
        <section className="py-12 md:py-20 bg-[var(--color-secondary)]">
            <div className="flex justify-center flex-col items-center gap-5 max-w-4xl mx-auto px-4  mb-20">

                <h3 className="text-center text-base md:text-[20px] font-regular text-[var(--color-accent)]! font-serif tracking-tight " data-aos="reveal-top">Brands On Board</h3>
                {/* <div className="w-[100px] h-[2px] bg-[var(--color-primary)]"></div> */}
                <h4 className="text-center text-lg md:text-[25px] font-regular font-serif tracking-tight " data-aos="fade-up" data-aos-delay="200">Trusted names shaping a complete lifestyle.</h4>
                <p className="text-center text-sm md:text-base font-regular font-serif tracking-tight " data-aos="fade-up" data-aos-delay="300">From retail destinations and educational institutions to lifestyle spaces and everyday conveniences, the township is supported by leading brands that enhance the quality, accessibility, and experience of community living.</p>

            </div>
            <InfiniteScrollingLogosAnimation />
        </section>
    );
}