"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        const lenis = new Lenis({
            duration: 2,
            smoothWheel: true,
            wheelMultiplier: 1.5,
            touchMultiplier: 1.3,
            infinite: false,
            lerp: 0.1,
        });

        lenisRef.current = lenis;

        lenis.scrollTo(0, { immediate: true });

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        lenis.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value?: number) {
                if (arguments.length && value !== undefined) {
                    lenis.scrollTo(value);
                }
                return lenis.scroll;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenis.destroy();
            ScrollTrigger.killAll();
        };
    }, []);

    return <>{children}</>;
}