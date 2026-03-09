"use client";
import { RiPagesFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import SectionsCard from "@/admin/components/card/SectionsCard";
import ProjectList from "@/admin/components/card/ProjectList";
import ProjectCard from "@/admin/components/card/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchDashboardProjects, fetchProject } from "@/features/slices/projectsSlice";

interface PageItem {
  name: string;
  slug: string; 
}

const pages: PageItem[] = [
  { name: "Pages", slug: "pages" },
  { name: "Platter", slug: "platter" },
  { name: "Project Status", slug: "projectStatus" },
  { name: "Typology", slug: "typology" },
  { name: "Sub Typology", slug: "subtypology" },
  { name: "Amenities Logo", slug: "amenities" },
  { name: "City", slug: "cities" }, 
  {name: "Developer", slug: "developer" },
];

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { dashboardProjects } = useAppSelector((state:any) => state.projects);
 

  const totalProject = dashboardProjects.length;

  useEffect(() => {
  dispatch(fetchDashboardProjects())
    
  }, [dispatch]);

  return (
    <section className="grid grid-cols-12 gap-6 body-detail">
      <div className="col-span-8">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12">
            <ProjectCard data={totalProject} />
          </div>
        </div>

        <SectionsCard title="Pages" icon={RiPagesFill} data={pages} />
      </div>

      <div className="col-span-4 overflow-auto max-h-[600px]">
        <ProjectList />
      </div>
    </section>
  );
};


export default Dashboard;
