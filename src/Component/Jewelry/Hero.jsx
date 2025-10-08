"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Hero() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });

    // Each animation will start after the previous one completes
    tl.from(headingRef.current, { y: 50, opacity: 0 })
      .from(paragraphRef.current, { y: 50, opacity: 0 })
      .from(buttonRef.current, { y: 50, opacity: 0 });
  }, []);

  return (
    <div className="h-[80vh] bg-gradient-to-b from-[#F3F3F3] via-[#F8F8F8] to-[#F9F9F9] w-full">
      <div className="relative w-full h-full">
        {/* Image */}
        <div className="h-full flex justify-end border w-full">
          <Image
            src="/JewelaryImg/jewelryHero.png"
            alt="hero"
            className="h-full w-[60%]"
            height={500}
            width={500}
          />
        </div>

        {/* Text content */}
        <div className="pl-28 w-[60%] absolute top-[30%] flex flex-col">
          <h1
            ref={headingRef}
            className="text-black text-[5vw] leading-20 font-[SubtitleJ]"
          >
            We've gathered the finest jewelry
          </h1>

          <p
            ref={paragraphRef}
            className="max-w-xl text-[#505050] pt-8"
          >
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
          </p>

          <button
            ref={buttonRef}
            className="bg-black w-52 py-4 rounded-4xl mt-8 uppercase"
          >
            shop now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
