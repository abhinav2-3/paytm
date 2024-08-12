import React, { ReactNode } from "react";
import SidebarItem from "../../components/SidebarItem";
import { IoMdHome } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <SidebarItem
          href="/dashboard"
          title="Dashboard"
          icon={<IoMdHome size={24} />}
        />
        <SidebarItem
          href="/transfer"
          title="Transfer"
          icon={<BiTransfer size={24} />}
        />
        <SidebarItem
          href="/transactions"
          title="Transactions"
          icon={<CiClock2 size={24} />}
        />
        <SidebarItem
          href="/p2p"
          title="P2P Transfer"
          icon={<GoArrowUpRight size={24} />}
        />
      </div>
      <div className="w-[76vw]">{children}</div>
    </div>
  );
};

export default layout;
