"use client";

import Image from "next/image";

const Infrastructure = () => {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-secondary">
            <div className="max-w-[1140px] mx-auto px-4 ">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    <div className="relative w-full lg:w-1/2 flex items-center justify-center">

                        <div className="relative z-20 w-[424px] md:w-[435px] h-auto">
                            <Image
                                src="/assets/images/about/brand-logo.png"
                                alt="TDI Infrastructure Logo"
                                width={424}
                                height={424}
                                className="w-full h-auto object-center object-cover"
                            />
                        </div>

                    </div>
                    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                        <h2 className="md:text-[24px] text-lg text-center  font-serif text-primary">
                            Conceived By TDI Infrastructure
                        </h2>
                        <p className="text-paragraph text-center text-sm md:text-base leading-relaxed  mx-auto lg:mx-0">
                            For over three decades, TDI Infrastructure has been at the forefront of transforming the urban landscape of North India. From expansive integrated townships to iconic lifestyle destinations and thriving commercial hubs, each project stands as a benchmark in scale, design, and visionary excellence. With a legacy rooted in quality and innovation, TDI continues to shape communities that stand the test of time.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Infrastructure;
