"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initGlobalPAnimation = (scope?: HTMLElement) => {

  const elements = scope
    ? scope.querySelectorAll("p")
    : document.querySelectorAll("p");

  elements.forEach((p) => {

    gsap.fromTo(
      p,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
        },
      }
    );

  });

};
