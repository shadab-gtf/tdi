"use client";

import React, { JSX, useState } from "react";
import { TiHome } from "react-icons/ti";
import { MdQuestionAnswer, MdContactMail } from "react-icons/md";
import Link from "next/link";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <TiHome />,
    href: "/admin",
  },
  {
    label: "Pages",
    icon: <MdQuestionAnswer />,
    href: "/admin/pages",
  },
  {
    label: "Enquiry",
    icon: <MdContactMail />,
    href: "/admin/enquiry",
  },
];

const LeftSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={`fixed top-0 left-0 h-screen p-[30px] bg-[#13131d] text-white shadow-md z-50 transition-all duration-500 overflow-hidden ${
        isOpen ? "w-[300px]" : "w-[80px]"
      }`}
    >
      <ul className="relative w-full">
        {/* Logo */}
        <li className="mb-[10px] flex justify-center">
          <Link href="/" className="flex items-center justify-start">
            <span className="icon min-w-[80px] flex justify-center px-[10px]">
              <img
               src="/images/logo.png"
                alt="logo-icon"
                className="w-[130px]"
              />
            </span>
          </Link>
        </li>

        {/* Menu */}
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="h-[60px] rounded-l-3xl transition-all duration-300 flex items-center"
          >
            <Link
              href={item.href}
              className="flex items-start gap-[35px] text-[#717177] hover:text-white"
            >
              <span className="icon text-xl flex justify-center">
                {item.icon}
              </span>
              <span className="title whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Toggle Button */}
      <button
        className="absolute bottom-5 left-[15px] bg-[#2b6a83] w-[40px] h-[40px] rounded-full border border-white flex items-center justify-center cursor-pointer group"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        <div className="relative w-[20px] h-[14px]">
          <span
            className={`absolute top-0 left-0 w-full h-[2px] bg-white rounded transition-transform duration-300 ${
              isOpen ? "rotate-[-45deg] translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-white rounded transition-transform duration-300 ${
              isOpen ? "rotate-[45deg] translate-y-[-6px]" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );
};

export default LeftSidebar;
