"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/images/sectors/slideshow/poultry_farming_1778947132361.png",
  "/images/sectors/slideshow/cattle_farming_1778947149092.png",
  "/images/sectors/slideshow/poultry_slaughterhouse_1778947160985.png",
  "/images/sectors/slideshow/cattle_slaughterhouse_1778947186542.png",
  "/images/sectors/slideshow/fish_industry_1778947201012.png",
  "/images/sectors/slideshow/dairy_industry_1778947214226.png",
];

export function HeroSlideshow({ altText }: { altText: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <Image
            key={src}
            src={src}
            alt={`${altText} - Slide ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover absolute inset-0 transition-all ease-in-out"
            style={{
              transitionDuration: "2000ms",
              opacity: isActive ? 1 : 0,
              transform: isActive ? "scale(1)" : "scale(1.1)",
              zIndex: isActive ? 10 : 0,
            }}
            priority={index === 0}
          />
        );
      })}
    </>
  );
}
