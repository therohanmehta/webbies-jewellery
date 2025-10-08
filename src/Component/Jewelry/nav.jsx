"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full h-auto bg-white flex items-center justify-between px-28 py-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/jewelaryImg/navLogo.png"
          alt="Logo"
          width={180}
          height={180}
        />
        {/* <span className="text-2xl font-semibold tracking-wide">LOGO</span> */}
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-10 text-[16px] font-medium font-[NavFont] text-[#2B2B2B]">
        <li className="cursor-pointer hover:text-black transition">Home</li>
        <li className="cursor-pointer hover:text-black transition">About</li>
        <li className="cursor-pointer hover:text-black transition">Services</li>
        <li className="cursor-pointer hover:text-black transition">Projects</li>
        <li className="cursor-pointer hover:text-black transition">Blog</li>
        <li className="cursor-pointer hover:text-black transition">
          Investor & Partner
        </li>
        <li className="cursor-pointer hover:text-black transition">Career</li>
      </ul>

      {/* Search Box */}
      <div className="flex items-center border border-gray-300  px-2 py-1 w-48">
        <FiSearch className="text-gray-500 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full text-[#2B2B2B] text-sm bg-transparent"
        />
      </div>
    </nav>
  );
}
