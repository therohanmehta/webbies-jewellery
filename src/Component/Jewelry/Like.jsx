"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const products = [
    { id: 1, img: "/jewelaryImg/Like1.png", description: "Excepteur sint" , price: "Rs-15,000" },
    { id: 2, img: "/jewelaryImg/Like2.png",description: "Excepteur sint" , price: "Rs-35,000" },
    { id: 3, img: "/jewelaryImg/Like3.png",description: "Excepteur sint" , price: "Rs-45,000" },
];

export default function LikeProd() {
    const sectionRef = useRef(null);
    const titleWrapperRef = useRef(null);
    const titleRef = useRef(null);
    const imgRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(titleRef.current, {
                y: "100%",
                opacity: 1,
            });

            gsap.to(titleRef.current, {
                y: "0%",
                opacity: 1,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "top 60%",
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        gsap.to(titleRef.current, {
                            scale: 0.95 + progress * 0.05,
                            duration: 0.1,
                        });
                    },
                },
            });

            gsap.from(imgRefs.current, {
                y: 100,
                opacity: 0,
                duration: 2,
                ease: "power3.out",
                stagger: 0.5,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            });

            const buttons = sectionRef.current.querySelectorAll("button");
            gsap.from(buttons, {
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.1,
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
        <div ref={sectionRef} className="w-full p-12 bg-[#57667A]">
            {/* Title & Arrows */}
            <div className="flex gap-6 justify-center items-center  mx-auto mb-8 px-4">

                <div className="w-[25vw] bg-white h-0.5"></div>
                <div
                    ref={titleWrapperRef}
                    className=" text-center overflow-hidden"
                    style={{ clipPath: "inset(0 0 0 0)" }}
                >
                    <h2
                        ref={titleRef}
                        className="  text-6xl font-[jewearly1] font-medium  inline-block"
                        style={{
                            transform: "translateY(100%)",
                            opacity: 0,
                        }}
                    >
                        You May Also Like
                    </h2>
                </div>

                <div className="w-[25vw] bg-white h-0.5">
                    
                </div>

                

                {/* <div className="flex gap-3 ml-auto">
          <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition-colors duration-300">
            <FiChevronLeft className="text-lg" />
          </button>
          <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 transition-colors duration-300">
            <FiChevronRight className="text-lg" />
          </button>
        </div> */}
            </div>

            {/* Swiper Carousel */}
            <div className="relative w-full  mx-auto overflow-hidden">
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={3}
                    spaceBetween={20}
                    // loop={true}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                >
                    {products.map((item, i) => (
                        <SwiperSlide key={item.id}>
                            <div
                                ref={(el) => (imgRefs.current[i] = el)}
                                className="w-full  flex flex-col items-center justify-center   "
                            >
                                <div className="h-[400px] w-full overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={`Product ${item.id}`}
                                    className="w-full h-full  object-cover transition-transform duration-700 hover:scale-105"
                                />
                                </div>

                                <h2 className="pt-6">{item.description}</h2>
                                <p className="pt-2">{item.price}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="flex justify-end mt-12 gap-3 ml-auto">
                <button className="custom-prev w-10 h-10 flex items-center justify-center bg-white  border border-[#ACAEB8]  transition-colors duration-300">
                    <FiChevronLeft className="text-lg text-[#ACAEB8]" />
                </button>
                <button className="custom-next w-10 h-10 flex items-center justify-center bg-white  border border-[#ACAEB8]  transition-colors duration-300">
                    <FiChevronRight className="text-lg text-[#ACAEB8] " />
                </button>
            </div>


        </div>
    );
}