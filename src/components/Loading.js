import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[30vh] space-y-6">
      {/* Animated Spinner */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-[#0069a8] border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-[#0069a8] rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Text */}
      <p className="text-xl font-semibold text-gray-700 tracking-wide">
        Loading Events...
      </p>

      {/* Skeleton bars */}
      <div className="space-y-3 w-64">
        <div className="h-3 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
