"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isInitialized = false;

export const initGlobalReveal = () => {

  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // prevent duplicate init
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());

  const elements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p, img, .reveal"
  );

  elements.forEach((el) => {

    if ((el as HTMLElement).dataset.gsapRevealed) return;

    (el as HTMLElement).dataset.gsapRevealed = "true";

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 60,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

  });

};

export const autoInitReveal = () => {

  if (isInitialized) return;

  isInitialized = true;
  window.addEventListener("load", initGlobalReveal);
  const observer = new MutationObserver(() => {
    initGlobalReveal();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

};
