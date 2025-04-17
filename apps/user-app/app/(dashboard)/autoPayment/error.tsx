"use client";
import Link from "next/link";
import React, { useEffect } from "react";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.log(error.message);
  }, [reset]);
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-lg text-red-800 mb-4">{error.message}</p>
      <div className="flex gap-16 justify-center items-center">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Try Again
        </button>
        <Link
          href={"/dashboard"}
          className="border p-2 px-6 border-black rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default error;
