import Image from "next/image";
import React from "react";

const DashboardHero = () => {
  return (
    <div className="bg-sky-200 w-3/4 h-[85vh] rounded-[4rem] absoulte flex items-center">
      <h1 className="pl-6 text-[4rem] font-semibold leading-snug">
        Fast, Safe, <br /> Social payments
      </h1>
      <Image
        alt="Hero Image"
        src={"/home-hero.webp"}
        width={560}
        height={150}
        className="relative top-24 left-28"
      />
    </div>
  );
};

export default DashboardHero;
