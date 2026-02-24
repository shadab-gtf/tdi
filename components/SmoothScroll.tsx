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
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.3,
            wheelMultiplier: 1.5,
            infinite: false,
        });
        lenisRef.current = lenis;
        lenis.scrollTo(0, { immediate: true });
        lenis.on("scroll", ScrollTrigger.update);
        function raf(time: number) {
            lenis.raf(time);
            ScrollTrigger.update();
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        ScrollTrigger.normalizeScroll(true);

        return () => {
            lenis.destroy();
            ScrollTrigger.killAll();
        };
    }, []);

    return <>{children}</>;
}
