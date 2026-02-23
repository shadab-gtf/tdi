"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import CitySelect from "./CitySelect";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// --- Validation Schema ---
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    mobile: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    city: z.string().min(1, "Please select a city"),
    message: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must authorize to proceed",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            city: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        console.log("Form Data:", data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        reset();
        alert("Message sent successfully!");
    };

    // --- Animations ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Text Animation
            gsap.from(".contact-header > *", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-header",
                    start: "top 80%",
                }
            });

            // Form Fields Animation
            gsap.from(".form-field", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 75%",
                }
            });

            // Sunburst Rotation
            gsap.to(".sunburst", {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: "linear",
            });

            // Footer Links Animation
            gsap.from(".footer-link-group", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#232E5A06] pt-20 pb-0 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="contact-header text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-xl md:text-2xl uppercase text-primary font-serif mb-4">
                        Contact Us
                    </h2>
                    <span className="font-serif text-paragraph   leading-relaxed">
                        We’re here to help you explore life at TDI City Kundli
                    </span>
                </div>

                {/* Form */}
                <div className="max-w-5xl mx-auto mb-32">
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">

                            {/* Name */}
                            <div className="form-field group relative">
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Your Name*"
                                    className="w-full bg-transparent border-b border-gray-300 py-4 text-lg text-[#767676] outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-primary"
                                />
                                {/* <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-focus-within:w-full"></span> */}
                                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="form-field group relative">
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-transparent border-b border-gray-300 py-4 text-lg text-[#767676] outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-primary"
                                />
                                {/* <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-focus-within:w-full"></span> */}
                                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
                            </div>

                            {/* Mobile */}
                            <div className="form-field group relative">
                                <input
                                    {...register("mobile")}
                                    type="tel"
                                    placeholder="Mobile Number*"
                                    className="w-full bg-transparent border-b border-gray-300 py-4 text-lg text-[#767676] outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-primary"
                                />
                                {/* <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-focus-within:w-full"></span> */}
                                {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile.message}</p>}
                            </div>

                            {/* City Select */}
                            <div className="form-field relative mt-3">
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }: { field: any }) => (
                                        <CitySelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            error={errors.city?.message}
                                        />
                                    )}
                                />
                            </div>

                            {/* Message */}
                            <div className="form-field col-span-1 md:col-span-2 group relative">
                                <input
                                    {...register("message")}
                                    type="text"
                                    placeholder="Your Message"
                                    className="w-full bg-transparent border-b border-gray-300 py-4 text-lg text-[#767676] outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-primary"
                                />
                                {/* <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-focus-within:w-full"></span> */}
                            </div>

                            {/* Consent */}
                            <div className="form-field col-span-1 md:col-span-2">
                                <label className="flex items-start cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            {...register("consent")}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border border-accent rounded-sm peer-checked:bg-accent peer-checked:border-accent transition-all duration-300 flex items-center justify-center">
                                            <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="ml-3 text-sm text-gray-500 leading-tight group-hover:text-primary transition-colors duration-300">
                                        I authorize company representatives to Call, SMS, Email, or WhatsApp me about its products and offers. This consent overrides any registration for DNC/NDNC.
                                    </span>
                                </label>
                                {errors.consent && <p className="text-red-500 text-sm mt-2">{errors.consent.message}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-field flex justify-center mt-12">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative bg-[#232E5A] text-white px-12 py-4 text-sm uppercase tracking-widest hover:bg-[#1a2345] transition-colors duration-300 flex items-center gap-3 overflow-hidden"
                            >
                                <span className="relative z-10">{isSubmitting ? "Sending..." : "Submit"}</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

                                {/* Button Hover Fill Effect */}
                                <div className="absolute inset-0 bg-[#D9991F] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                            </button>
                        </div>
                    </form>
                </div>




                {/* Sunburst Background - Fixed Position */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-15 overflow-hidden w-[800px] h-[800px] flex items-center justify-center">
                    <Image
                        src="/assets/images/sunburst.png"
                        alt="Sunburst"
                        width={800}
                        height={800}
                        className="sunburst w-full h-full object-contain"
                    />
                </div>

            </div>
        </section>
    );
}
