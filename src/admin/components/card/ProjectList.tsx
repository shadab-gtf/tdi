"use client";
import React, { useEffect } from "react";
import Card from "./Card";
import CardHeading from "./CardHeading";
import { useAppSelector } from "@/redux/hooks";
import { Project } from "@/types/project";

const ProjectList: React.FC = () => {
  const { dashboardProjects } = useAppSelector((state) => state.projects);


  return (
    <Card>
      <CardHeading>Project List</CardHeading>

      {dashboardProjects.length > 0 ? (
        <ul>
          {dashboardProjects.map((item) => (
            <li
              key={item.id}
              className="text-[#eee] text-[12px] font-robotoLight tracking-[0.8px] leading-[26px] mb-[10px] pb-[10px] border-b border-[#45464f]"
            >
              {item.projectName}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[#eee] text-[12px] font-robotoLight tracking-[0.8px] leading-[26px] mb-[10px] pb-[10px] border-b border-[#45464f]">
          No Data Available
        </p>
      )}
    </Card>
  );
};
export default ProjectList;
