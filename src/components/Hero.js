"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Experience the Beat",
    subtitle: "Join the most electrifying music festivals and live performances of the year.",
    image: "/images/concert_hero.png",
    cta1: "Explore Events",
    cta2: "Create Event",
    theme: "text-white",
    overlay: "bg-black/40",
  },
  {
    id: 2,
    title: "Network & Grow",
    subtitle: "Connect with industry leaders and innovators at our premium business conferences.",
    image: "/images/conference_hero.png",
    cta1: "View Schedule",
    cta2: "Join Now",
    theme: "text-white",
    overlay: "bg-black/50",
  },
  {
    id: 3,
    title: "Unforgettable Moments",
    subtitle: "Celebrate life's most precious milestones in elegant and sophisticated settings.",
    image: "/images/gala_hero.png",
    cta1: "Find Venue",
    cta2: "Start Planning",
    theme: "text-white",
    overlay: "bg-black/40",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-[85vh] w-full mt-1 overflow-hidden bg-gray-900 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              priority
              className="object-cover"
            />
            {/* Dark Overlay */}
            <div className={`absolute inset-0 ${slides[currentSlide].overlay}`} />
          </div>

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight ${slides[currentSlide].theme}`}
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${slides[currentSlide].theme} opacity-90`}
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center gap-6"
              >
                <Link href="/all-events">
                  <button className="px-10 py-5 bg-sky-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    {slides[currentSlide].cta1}
                  </button>
                </Link>
                <Link href="/create-event">
                  <button className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 cursor-pointer">
                    {slides[currentSlide].cta2}
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`transition-all duration-500 rounded-full h-2.5 cursor-pointer ${
              currentSlide === index ? "w-10 bg-sky-500" : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
