"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-[#0069a8] border-gray-200 rounded-full animate-spin mb-5"></div>

      {/* Loading Text */}
      <p className="text-xl md:text-2xl font-semibold text-[#0069a8]">
        Loading recent events...
      </p>
    </div>
  );
};

export default Loading;
