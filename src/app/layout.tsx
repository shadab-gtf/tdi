"use client";
import React from "react";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerif.variable} font-serif antialiased bg-[#F8FBFF]`}
      >
        <SmoothScroll>
          <Header />
          <main className="">
            {children}
          </main>
          <WhatsAppFloating />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

