"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Shop() {
  const sectionRef = useRef(null);
  const leftShapeRef = useRef(null);
  const rightShapeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left shape from far left of screen
      gsap.from(leftShapeRef.current, {
        x: -window.innerWidth,
        opacity: 0,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });


      gsap.from(rightShapeRef.current, {
        x: window.innerWidth,
        opacity: 0,
        duration: 2.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex items-center justify-between h-auto bg-[#e9edf1] py-12 px-20"
    >
      {/* Left Content */}
      <div className="w-[60%]">
        <h1 className="text-6xl  font-extralight font-[jewearly1] leading-tight text-black">
          LOREM IPSUM <br /> DOLOR SIT AMET, <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CONSECTETUR
        </h1>
        <p className="mt-8 text-lg text-gray-700 pl-52 max-w-2xl">
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
          quam nihil molestiae vel illum qui dolorem eum fugiat quo voluptas
          nulla pariatur
        </p>
        <button className="mt-10 ml-52 px-8 py-3 rounded-full bg-[#485669] text-white text-lg font-medium hover:bg-[#2b3440] transition-all">
          SHOP NOW
        </button>
      </div>

      {/* Right Image Section */}
      <div className="relative w-[40%] flex justify-center">
        {/* Background Shapes with animation */}
        <div
          ref={leftShapeRef}
          className="absolute bottom-0 right-30 w-[450px] h-[200px] rounded-full bg-gray-300"
        ></div>
        <div
          ref={rightShapeRef}
          className="absolute bottom-30 right-0 w-[450px] h-[200px] rounded-full bg-gray-300"
        ></div>

        {/* Model Image */}
        <Image
          alt="model"
          src="/JewelaryImg/Model4.png"
          width={450}
          height={600}
          className="relative z-10 object-contain"
        />
      </div>
    </div>
  );
}

export default Shop;