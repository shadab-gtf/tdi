"use client";
import { useState } from "react";
import HeroMedia from "@/components/Hero";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import Awards from "@/components/Awards";
import SectionIntro from "@/components/AboutTdi";

const yearOptions = ["All", "2026", "2025"];

export default function AwardsPage() {
  const [selectedYear, setSelectedYear] = useState("All");

  return (
    <main className="relative min-h-screen w-full bg-white">
      <GlobalAnimation />
      <HeroMedia type="image" src="/assets/images/awward/awards-hero.png" />
      <SectionIntro
        title="Excellence Recognised. Trust Reinforced"
        description="Over the years, TDI has earned recognition for its commitment to quality construction, ethical practices, and visionary township development. Each award reflects the trust of our customers and the strength of our long-standing legacy."
        showBirds={false}
      />
      {/* Awards Section with Title + Filter */}
      <section className="w-full bg-[#F0F4FA] py-10  px-4">
        <div className="containers mx-auto">
          {/* Title */}
          <h2 className="text-center text-xl md:text-[25px] text-black font-serif mb-6 md:mb-10">
            Awards
          </h2>

          {/* Filter Row */}
          <div
            className="flex items-center justify-between max-w-7xl mx-auto "
            data-aos="fade-up"
          >
            <p className="text-base md:text-lg font-serif text-[#424242]">
              Select Filter
            </p>
            <div className="flex items-center gap-3">
              <label
                htmlFor="year-filter"
                className="md:text-lg  text-[#424242] text-base font-serif "
              >
                Year:
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-b border-gray-300  px-3 py-1.5 text-xs md:text-sm font-serif  text-gray-800 outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Awards Slider */}
          <Awards
            filterYear={selectedYear}
            showHeader={false}
            showFooterText={true}
          />
        </div>
      </section>
    </main>
  );
}
