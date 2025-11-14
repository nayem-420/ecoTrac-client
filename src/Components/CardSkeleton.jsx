import React from "react";

const CardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <figure className="h-48 bg-gray-300"></figure>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
          <div className="h-6 bg-gray-300 rounded-full w-20"></div>
        </div>
        <div className="card-actions justify-end">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

// Grid component with multiple skeletons
export const CardSkeletonGrid = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  );
};

export default CardSkeleton;
