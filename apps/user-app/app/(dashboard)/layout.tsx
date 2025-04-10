import React, { ReactNode } from "react";
import SidebarItem from "../../components/SidebarItem";
import { IoMdHome } from "react-icons/io";
import { BiTransfer } from "react-icons/bi";
import { CiClock2 } from "react-icons/ci";
import { GoArrowUpRight } from "react-icons/go";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { FaBuildingLock } from "react-icons/fa6";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="w-auto border-r border-slate-300 min-h-[90vh] mr-4 pt-28">
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
        <SidebarItem
          href="/users"
          title="All Users"
          icon={<AiOutlineUserSwitch size={24} />}
        />
        <SidebarItem
          href="/cashwithdraw"
          title="Cash Withdraw"
          icon={<RiMoneyRupeeCircleLine size={24} />}
        />
        <SidebarItem
          href="/smartLock"
          title="Smart Lock[FD]"
          icon={<FaBuildingLock size={24} />}
        />
      </div>
      <div className="w-[76vw]">{children}</div>
    </div>
  );
};

export default layout;
