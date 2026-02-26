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
                            TDI Infrastructure is a real estate development group focused on creating thoughtfully
                            planned urban environments. With an emphasis on quality, responsible planning, and
                            long-term value, TDI Infrastructure develops residential, commercial, and mixed-use
                            spaces designed to support evolving lifestyles and sustainable community growth.
                        </p>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Infrastructure;
