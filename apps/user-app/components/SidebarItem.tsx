"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: ReactNode;
}) => {
  const pathName = usePathname();
  const selected = pathName == href;

  return (
    <Link
      href={href}
      className={`flex gap-3 p-2 pl-8 items-center ${selected ? "text-[#6a51a6]" : "text-slate-700"}`}
    >
      <div>{icon}</div>
      <div className="font-bold hidden sm:block">{title}</div>
    </Link>
  );
};

export default SidebarItem;
