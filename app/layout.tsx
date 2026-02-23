"use client";
import React from "react";
// import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "TDI City",
//   description: "TDI City Township",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} font-serif antialiased bg-[#F8FBFF]`}
      >
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            {/* <main className="min-h-screen"> */}
            <main className="">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
