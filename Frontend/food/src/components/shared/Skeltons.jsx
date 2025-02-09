import React from "react";

function MenuItemsSkeleton() {
  return (
    <div className="flex flex-wrap gap-10 justify-center px-10 py-8">
      {/* Skeleton Loader for Menu Item Cards */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-80 h-96 bg-gray-200 rounded-lg p-4">
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 animate-pulse"></div>
          {/* Title Skeleton */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
          {/* Description Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-4 animate-pulse"></div>
          {/* Button Skeleton */}
          <div className="h-10 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default MenuItemsSkeleton;
