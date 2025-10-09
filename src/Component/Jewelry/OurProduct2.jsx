"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { productData, categories } from "@/Data";

gsap.registerPlugin(ScrollTrigger);

function Product2() {
    const [activeSection, setActiveSection] = useState(0);
    const componentRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const totalSections = 5;
    const scrollTriggerRef = useRef(null);
    const imagesRef = useRef([]);
    const contentRef = useRef(null);
    const productsRef = useRef([]);

  

    
    // const animateSection = (newSection) => {
    //     if (isAnimatingRef.current) return;
    //     isAnimatingRef.current = true;

    //     const tl = gsap.timeline({
    //         onComplete: () => {
    //             isAnimatingRef.current = false;
    //         }
    //     });

    //     tl.to(contentRef.current, {
    //         opacity: 0,
    //         y: -20,
    //         duration: 0.3,
    //         ease: "power2.in"
    //     })
    //     .call(() => {
    //         setActiveSection(newSection);
    //     })
    //     .fromTo(contentRef.current, 
    //         { opacity: 0, y: 20 },
    //         { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    //     )
    //     .fromTo(productsRef.current,
    //         { opacity: 0, y: 30 },
    //         { 
    //             opacity: 1, 
    //             y: 0, 
    //             duration: 0.5,
    //             stagger: 0.08,
    //             ease: "power2.out"
    //         },
    //         "-=0.2"
    //     );

        
    //     imagesRef.current.forEach((img, index) => {
    //         if (index === newSection) {
    //             gsap.to(img, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
    //         } else {
    //             gsap.to(img, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
    //         }
    //     });
    // };

  const animateSection = (newSection) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
        onComplete: () => {
            isAnimatingRef.current = false;
        }
    });

    tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
    })
    .call(() => {
        setActiveSection(newSection);
    })
    .fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    )
    .fromTo(productsRef.current,
        { opacity: 0, y: 100, scale: 0.95 }, 
        { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 1.5, 
            stagger: 0.12, 
            ease: "power3.out" 
        },
        "-=0.5" 
    );

    // Image 
    imagesRef.current.forEach((img, index) => {
        if (index === newSection) {
            gsap.to(img, { opacity: 1, duration: 0.6, ease: "power2.inOut" });
        } else {
            gsap.to(img, { opacity: 0, duration: 0.6, ease: "power2.inOut" });
        }
    });
};
    useEffect(() => {
        if (!componentRef.current) return;

        let currentIndex = 0;

        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: componentRef.current,
            start: "top top",
            end: `+=${window.innerHeight * (totalSections - 1.5)}`,
            // end: `+=${window.innerHeight * 2}`,
            pin: true,
            pinSpacing: true,
            scrub: false,
            onUpdate: (self) => {
                const progress = self.progress;
                const newIndex = Math.round(progress * (totalSections - 1));
                
                if (newIndex !== currentIndex && !isAnimatingRef.current) {
                    currentIndex = newIndex;
                    animateSection(newIndex);
                }
            }
        });

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, []);

    const handleCategoryClick = (index) => {
        animateSection(index);
        
        if (scrollTriggerRef.current) {
            const progress = index / (totalSections - 1);
            const scrollPosition = scrollTriggerRef.current.start + 
                (scrollTriggerRef.current.end - scrollTriggerRef.current.start) * progress;
            
            gsap.to(window, {
                scrollTo: scrollPosition,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    };

    const currentData = productData[activeSection];

    return (
        <section 
            ref={componentRef} 
            className="h-screen w-full flex relative"
        >
            <div className="w-1/2 h-full relative overflow-hidden bg-black">
                {Object.entries(productData).map(([key, data], index) => (
                    <div
                        key={key}
                        ref={el => imagesRef.current[index] = el}
                        className="absolute inset-0"
                        style={{ opacity: index === 0 ? 1 : 0, zIndex: index === activeSection ? 10 : 0 }}
                    >
                        <Image
                            src={data.image}
                            alt={`${data.title}`}
                            fill
                            className="object-cover"
                            priority={key === "0"}
                            quality={85}
                        />
                    </div>
                ))}

               
                <div className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col gap-8 text-white/90 text-sm tracking-[0.15em] uppercase z-20">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            // onClick={() => handleCategoryClick(category.id)}
                            className={`text-left  transition-all duration-300 ${
                                activeSection === category.id
                                    ? "font-semibold scale-110"
                                    : "hover:text-white"
                            }`}
                        >
                            <span className="flex font-[SubtitleJ] uppercase items-center gap-4">
                                <hr className={`transition-all duration-500 border-current ${
                                    activeSection === category.id ? "w-20" : "w-12"
                                }`} /> 
                                {category.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Section (Content + Products) */}
            <div className="w-1/2 h-full bg-[#485669] flex items-center justify-center overflow-hidden">
                <div className="text-white px-10 w-full">
                    {/* Animated Content */}
                    <div ref={contentRef}>
                        {/* Heading */}
                        <div className="text-center">
                            <h2 className="uppercase text-8xl font-[jewearly1] font-medium tracking-wide">
                                {currentData?.title}
                            </h2>
                            <p className="max-w-lg mx-auto mt-12 text-sm text-gray-200">
                                {currentData?.description}
                            </p>
                        </div>

                        {/* Product Cards */}
                        <div className="flex justify-center gap-4 mt-10">
                            {currentData?.products?.map((product, index) => (
                                <div 
                                    key={product.id}
                                    ref={el => productsRef.current[index] = el}
                                    className="w-1/3 text-center"
                                >
                                    <div className="bg-white/90 p-4">
                                        <Image
                                            src={product.img}
                                            alt={product.name}
                                            width={150}
                                            height={150}
                                            className="mx-auto h-42 object-contain"
                                            quality={80}
                                        />
                                    </div>
                                    <p className="text-white text-sm mt-8 font-medium">
                                        {product.name}
                                    </p>
                                    <p className="text-white mt-4 text-sm">{product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product2;