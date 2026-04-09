"use client";
import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-sky-600 to-cyan-500 p-8 md:p-16 text-center text-white shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Don't Miss Out on the Best Events!
            </h2>
            <p className="text-sky-50 text-lg mb-10 opacity-90">
              Subscribe to our newsletter and get the latest event updates, exclusive offers, and early-bird access delivered straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
              >
                Subscribe Now
              </button>
            </form>
            
            <p className="mt-6 text-sm text-sky-100/70">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
