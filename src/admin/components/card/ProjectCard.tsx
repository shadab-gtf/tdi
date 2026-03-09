"use client";
import React from "react";
import Card from "./Card";
import CardHeading from "./CardHeading";
import { IoMdHome } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import Link from "next/link";

interface ProjectCardProps {
  data?: number | string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data })  => {
  return (
    <Card>
      <CardHeading icon={IoMdHome}>Total Project</CardHeading>

      <div className="flex gap-[15px] 2xl:gap-[20px]">
        <h1 className="text-[var(--admin-primary)] text-[35px] 2xl:text-[45px] font-josefin">
          {data || 0}
        </h1>

        <div className="w-full">
          <p className="text-white font-robotoLight text-[18px] 2xl:text-[22px] tracking-[0.8px] border-b border-[#45464f] pb-[12px]">
            No. of Project
          </p>

          <div className="flex justify-start gap-[10px] mt-[20px] w-full">
            <Link
              href="/admin/project"
              className="border border-[var(--admin-secondary)] group hover:bg-[var(--admin-secondary)] text-[10px] 2xl:text-[11px] flex justify-center items-center gap-[5px] px-[15px] 2xl:px-[20px] py-[9px] rounded-[50px] tracking-[0.5px] font-robotoLight text-white"
            >
              <IoAddCircleOutline className="text-[var(--admin-secondary)] group-hover:text-white text-[20px]" />
              Projects Details
            </Link>

            {/* <Link
              href="/admin/cities"
              className="border border-[var(--admin-secondary)] group hover:bg-[var(--admin-secondary)] text-[10px] 2xl:text-[11px] flex justify-center items-center gap-[5px] px-[15px] 2xl:px-[20px] py-[9px] rounded-[50px] tracking-[0.5px] font-robotoLight text-white"
            >
              <IoAddCircleOutline className="text-[var(--admin-secondary)] group-hover:text-white text-[20px]" />
              Cities
            </Link> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
