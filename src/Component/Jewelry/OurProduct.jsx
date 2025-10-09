"use client"
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";

function Product() {
    const [activeSection, setActiveSection] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const componentRef = useRef(null);
    const isAnimatingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);
    const totalSections = 5;

    const productData = {
        0: {
            title: "Rings",
            image: "/JewelaryImg/productModel.png",
            description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae vel illum qui dolorem.",
            products: [
                { id: 1, img: "/JewelaryImg/Rings.png", name: "EXCEPTEUR SINT", price: "₹21000.00" },
                { id: 2, img: "/JewelaryImg/Rings2.png", name: "EXCEPTEUR SINT", price: "₹25000.00" },
                { id: 3, img: "/JewelaryImg/Rings3.png", name: "EXCEPTEUR SINT", price: "₹23000.00" },
            ]
        },
        1: {
            title: "Ear Rings",
            image: "/JewelaryImg/Model2.png",
            description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae vel illum qui dolorem.",
            products: [
                { id: 1, img: "/JewelaryImg/EarRing1.png", name: "EXCEPTEUR SINT", price: "₹21000.00" },
                { id: 2, img: "/JewelaryImg/EarRing2.png", name: "EXCEPTEUR SINT", price: "₹25000.00" },
                { id: 3, img: "/JewelaryImg/EarRing3.png", name: "EXCEPTEUR SINT", price: "₹23000.00" },
            ]
        },
        2: {
            title: "Necklace",
            image: "/JewelaryImg/Model3.png",
            description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae vel illum qui dolorem.",
            products: [
                { id: 1, img: "/JewelaryImg/necklace1.png", name: "EXCEPTEUR SINT", price: "₹18000.00" },
                { id: 2, img: "/JewelaryImg/necklace2.png", name: "EXCEPTEUR SINT", price: "₹22000.00" },
                { id: 3, img: "/JewelaryImg/necklace3.png", name: "EXCEPTEUR SINT", price: "₹20000.00" },
            ]
        },
        3: {
            title: "Bracelets",
            image: "/JewelaryImg/braceletModel.png",
            description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae vel illum qui dolorem.",
            products: [
                { id: 1, img: "/JewelaryImg/Bracelet1.png", name: "EXCEPTEUR SINT", price: "₹19000.00" },
                { id: 2, img: "/JewelaryImg/Bracelet2.png", name: "EXCEPTEUR SINT", price: "₹24000.00" },
                { id: 3, img: "/JewelaryImg/Bracelet3.png", name: "EXCEPTEUR SINT", price: "₹21000.00" },
            ]
        },
        4: {
            title: "Bangles",
            image: "/JewelaryImg/necklaceModel.png",
            description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae vel illum qui dolorem.",
            products: [
                { id: 1, img: "/JewelaryImg/Necklace1.png", name: "EXCEPTEUR SINT", price: "₹35000.00" },
                { id: 2, img: "/JewelaryImg/Necklace2.png", name: "EXCEPTEUR SINT", price: "₹42000.00" },
                { id: 3, img: "/JewelaryImg/Necklace3.png", name: "EXCEPTEUR SINT", price: "₹38000.00" },
            ]
        }
    };

    const categories = [
        { id: 0, label: "Rings" },
        { id: 1, label: "Ear Rings" },
        { id: 2, label: "Necklace" },
        { id: 3, label: "Bracelets" },
        { id: 4, label: "Bangles" }
    ];

    const handleWheel = useCallback((e) => {
        if (!componentRef.current) return;

        const rect = componentRef.current.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;

        if (!isInView && !isLocked) return;

        // Component just entered viewport - lock it
        if (isInView && !isLocked) {
            setIsLocked(true);
            e.preventDefault();
            return;
        }

        // Component is locked - handle section navigation
        if (isLocked) {
            e.preventDefault();

            // Prevent rapid scrolling
            if (isAnimatingRef.current) return;

            // Clear previous timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                const delta = e.deltaY;

                if (delta > 0) {
                    // Scrolling down
                    if (activeSection < totalSections - 1) {
                        isAnimatingRef.current = true;
                        setActiveSection(prev => prev + 1);

                        setTimeout(() => {
                            isAnimatingRef.current = false;
                        }, 600);
                    } else {
                        // Last section reached - unlock
                        setIsLocked(false);
                        // Allow immediate scroll after unlock
                        setTimeout(() => {
                            window.scrollBy({ top: 100, behavior: 'smooth' });
                        }, 100);
                    }
                } else {
                    // Scrolling up
                    if (activeSection > 0) {
                        isAnimatingRef.current = true;
                        setActiveSection(prev => prev - 1);

                        setTimeout(() => {
                            isAnimatingRef.current = false;
                        }, 600);
                    } else {
                        // First section reached - unlock
                        setIsLocked(false);
                        // Allow immediate scroll after unlock
                        setTimeout(() => {
                            window.scrollBy({ top: -100, behavior: 'smooth' });
                        }, 100);
                    }
                }
            }, 50);
        }
    }, [isLocked, activeSection, totalSections]);

    useEffect(() => {
        const handleUnlock = () => {
            // Reset lock state when scrolling away from component
            if (isLocked && componentRef.current) {
                const rect = componentRef.current.getBoundingClientRect();
                const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;

                if (isOutOfView) {
                    setIsLocked(false);
                }
            }
        };

        const handleScroll = () => {
            requestAnimationFrame(handleUnlock);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleWheel, isLocked]);

    const currentData = productData[activeSection];

    return (
        <section
            ref={componentRef}
            className={`h-screen w-full flex ${isLocked ? 'fixed inset-0 z-50' : 'relative'}`}
        >
            {/* Left Section (Model) */}
            <div className="w-1/2 h-full relative overflow-hidden bg-black">
                {/* All Images Stacked */}
                {Object.entries(productData).map(([key, data]) => (
                    <div
                        key={key}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out will-change-opacity ${activeSection === parseInt(key)
                                ? 'opacity-100 z-10'
                                : 'opacity-0 z-0'
                            }`}
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

                {/* Side Menu */}
                <div className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col gap-8 text-white/90 text-sm tracking-[0.15em] uppercase z-20">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveSection(category.id)}
                            className={`text-left cursor-pointer transition-all duration-300 will-change-transform ${activeSection === category.id
                                    ? "font-semibold scale-110"
                                    : "hover:text-white"
                                }`}
                        >
                            <span className="flex font-[SubtitleJ] uppercase items-center gap-4">
                                <hr className={`transition-all duration-500 border-current ${activeSection === category.id ? "w-20" : "w-12"
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
                    <div
                        key={activeSection}
                        className="animate-fadeIn"
                    >
                        {/* Heading */}
                        <div className="text-center">
                            <h2 className="uppercase text-8xl font-[jewearly1] font-medium tracking-wide">
                                {currentData.title}
                            </h2>
                            <p className="max-w-lg mx-auto mt-12 text-sm text-gray-200">
                                {currentData.description}
                            </p>
                        </div>

                        {/* Product Cards */}
                        <div className="flex justify-center gap-4 mt-10">
                            {currentData.products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="w-1/3 text-center"
                                    style={{
                                        animation: `slideUp 0.5s ease-out ${index * 0.08}s both`
                                    }}
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

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </section>
    );
}

export default Product;