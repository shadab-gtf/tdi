import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TDI City",
  description: "TDI City Township",
};

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
        <Header />
        <main className=" min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
