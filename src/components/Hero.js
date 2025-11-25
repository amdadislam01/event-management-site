import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Manage Your Events
            <span className="text-sky-600"> Smarter & Faster</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
            Discover upcoming events, organize schedules, create new events, and
            manage everything effortlessly with EventFlow’s modern tools.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/all-events">
            <button className="px-7 py-3 bg-linear-to-r from-sky-600 to-cyan-500 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition-all cursor-pointer">
              Explore Events
            </button>
            </Link>
            <Link href="/create-event">
              <button className="px-7 py-3 border-2 border-sky-500 text-sky-600 font-semibold rounded-xl hover:bg-sky-50 transition-all cursor-pointer">
                Create Event
              </button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 bg-sky-200/30 blur-2xl rounded-3xl pointer-events-none" />
          <Image
            src="/banner.png"
            alt="Event Management Banner"
            width={650}
            height={450}
            className="relative rounded-3xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
