// "use client";

// import { useEffect, useRef } from "react";
// import Lenis from "lenis";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function SmoothScroll({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const lenisRef = useRef<Lenis | null>(null);

//     useEffect(() => {
//         if (typeof window === "undefined") return;
//         if ("scrollRestoration" in window.history) {
//             window.history.scrollRestoration = "manual";
//         }
//         const lenis = new Lenis({
//             duration: 2,
//             smoothWheel: true,
//             wheelMultiplier: 1.5,
//             touchMultiplier: 1.3,
//             infinite: false,
//             lerp: 0.1,
//         });

//         lenisRef.current = lenis;

//         lenis.scrollTo(0, { immediate: true });

//         gsap.ticker.add((time) => {
//             lenis.raf(time * 1000);
//         });

//         gsap.ticker.lagSmoothing(0);

//         lenis.on("scroll", ScrollTrigger.update);

//         ScrollTrigger.scrollerProxy(document.body, {
//             scrollTop(value?: number) {
//                 if (arguments.length && value !== undefined) {
//                     lenis.scrollTo(value);
//                 }
//                 return lenis.scroll; 
//             },
//             getBoundingClientRect() {
//                 return {
//                     top: 0,
//                     left: 0,
//                     width: window.innerWidth,
//                     height: window.innerHeight,
//                 };
//             },
//         });

//         ScrollTrigger.refresh();

//         return () => {
//             gsap.ticker.remove((time) => {
//                 lenis.raf(time * 1000);
//             });
//             lenis.destroy();
//             ScrollTrigger.killAll();
//         };
//     }, []);

//     return <>{children}</>;
// }   

"use client";

import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register plugins safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    useLayoutEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        const isMobile = window.innerWidth <= 768;

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: isMobile ? 4 : 3.2,
            smoothTouch: isMobile ? 3 : false,
            effects: false,
            ignoreMobileResize: true,
        });

        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <div
            id="smooth-wrapper"
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div
                id="smooth-content"
                style={{
                    transform: "translate3d(0,0,0)",
                    willChange: "transform",
                }}
            >
                {children}
            </div>
        </div>
    );
}
