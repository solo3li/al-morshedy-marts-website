"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getImageUrl } from '../utils/api';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface HeroSliderProps {
  banners: any[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === (banners?.length || 1) - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? (banners?.length || 1) - 1 : current - 1);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden bg-gray-100">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0">
            <img 
              src={getImageUrl(banner.image)}
              alt={banner.title}
              onError={(e) => { e.currentTarget.src = '/eshk-logo.png'; }}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-md">
              {banner.title}
            </h2>
            <p className="text-xl md:text-2xl text-gray-100 font-medium drop-shadow-md max-w-2xl">
              {banner.subtitle}
            </p>
            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition transform hover:scale-105">
              تسوق الآن
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition text-gray-800"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/50 hover:bg-white p-2 rounded-full shadow-md transition text-gray-800"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 rtl:space-x-reverse">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current ? 'bg-red-600 w-8' : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
