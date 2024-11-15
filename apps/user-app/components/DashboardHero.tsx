import Image from "next/image";
import React from "react";

const DashboardHero = () => {
  return (
    <div className="bg-sky-200 md:w-3/4 w-4/5 md:h-[85vh] h-[60vh] rounded-[4rem] absoulte flex items-center">
      <h1 className="pl-6 md:text-[4rem] text-5xl font-semibold leading-snug">
        Fast, Safe, <br /> Social payments
      </h1>
      <Image
        alt="Hero Image"
        src={"/home-hero.webp"}
        width={560}
        height={150}
        className="relative md:top-24 md:left-28 top-72 right-48"
      />
    </div>
  );
};

export default DashboardHero;
